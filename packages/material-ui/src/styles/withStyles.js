/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { getDisplayName, ponyfillGlobal } from '@material-ui/utils';
import { create } from 'jss';
import ns from './reactJssContext';
import jssPreset from './jssPreset';
import mergeClasses from './mergeClasses';
import multiKeyStore from './multiKeyStore';
import createMuiTheme from './createMuiTheme';
import themeListener from './themeListener';
import createGenerateClassName from './createGenerateClassName';
import getStylesCreator from './getStylesCreator';
import getThemeProps from './getThemeProps';

// Default JSS instance.
const jss = create(jssPreset());

// Use a singleton or the provided one by the context.
//
// The counter-based approach doesn't tolerate any mistake.
// It's much safer to use the same counter everywhere.
const generateClassName = createGenerateClassName();

// Global index counter to preserve source order.
// We create the style sheet during at the creation of the component,
// children are handled after the parents, so the order of style elements would be parent->child.
// It is a problem though when a parent passes a className
// which needs to override any child's styles.
// StyleSheet of the child has a higher specificity, because of the source order.
// So our solution is to render sheets them in the reverse order child->sheet, so
// that parent has a higher specificity.
let indexCounter = -10e10;

// Exported for test purposes
export const sheetsManager = new Map();

// We use the same empty object to ref count the styles that don't need a theme object.
const noopTheme = {};

// In order to have self-supporting components, we rely on default theme when not provided.
const defaultTheme = createMuiTheme();

// Link a style sheet with a component.
// It does not modify the component passed to it;
// instead, it returns a new component, with a `classes` property.
const withStylesOld = (stylesOrCreator, options = {}) => Component => {
  const { withTheme = false, flip = null, name, ...styleSheetOptions } = options;
  const stylesCreator = getStylesCreator(stylesOrCreator);
  const listenToTheme = stylesCreator.themingEnabled || typeof name === 'string' || withTheme;

  indexCounter += 1;
  stylesCreator.options.index = indexCounter;

  warning(
    indexCounter < 0,
    [
      'Material-UI: you might have a memory leak.',
      'The indexCounter is not supposed to grow that much.',
    ].join('\n'),
  );

  class WithStyles extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.jss = context[ns.jss] || jss;
      this.sheetsManager = sheetsManager;
      this.unsubscribeId = null;

      const { muiThemeProviderOptions } = context;
      if (muiThemeProviderOptions) {
        if (muiThemeProviderOptions.sheetsManager) {
          this.sheetsManager = muiThemeProviderOptions.sheetsManager;
        }
        this.sheetsCache = muiThemeProviderOptions.sheetsCache;
        this.disableStylesGeneration = muiThemeProviderOptions.disableStylesGeneration;
      }

      // Attach the stylesCreator to the instance of the component as in the context
      // of react-hot-loader the hooks can be executed in a different closure context:
      // https://github.com/gaearon/react-hot-loader/blob/master/src/patch.dev.js#L107
      this.stylesCreatorSaved = stylesCreator;
      this.sheetOptions = {
        generateClassName,
        ...context[ns.sheetOptions],
      };
      // We use || as the function call is lazy evaluated.
      this.theme = listenToTheme ? themeListener.initial(context) || defaultTheme : noopTheme;

      this.attach(this.theme);

      this.cacheClasses = {
        // Cache for the finalized classes value.
        value: null,
        // Cache for the last used classes prop pointer.
        lastProp: null,
        // Cache for the last used rendered classes pointer.
        lastJSS: {},
      };
    }

    componentDidMount() {
      if (!listenToTheme) {
        return;
      }

      this.unsubscribeId = themeListener.subscribe(this.context, theme => {
        const oldTheme = this.theme;
        this.theme = theme;
        this.attach(this.theme);

        // Rerender the component so the underlying component gets the theme update.
        // By theme update we mean receiving and applying the new class names.
        this.setState({}, () => {
          this.detach(oldTheme);
        });
      });
    }

    componentDidUpdate() {
      // react-hot-loader specific logic
      if (this.stylesCreatorSaved === stylesCreator || process.env.NODE_ENV === 'production') {
        return;
      }

      this.detach(this.theme);
      this.stylesCreatorSaved = stylesCreator;
      this.attach(this.theme);
      this.forceUpdate();
    }

    componentWillUnmount() {
      this.detach(this.theme);

      if (this.unsubscribeId !== null) {
        themeListener.unsubscribe(this.context, this.unsubscribeId);
      }
    }

    getClasses() {
      if (this.disableStylesGeneration) {
        return this.props.classes || {};
      }

      // Tracks if either the rendered classes or classes prop has changed,
      // requiring the generation of a new finalized classes object.
      let generate = false;

      const sheetManager = multiKeyStore.get(
        this.sheetsManager,
        this.stylesCreatorSaved,
        this.theme,
      );

      if (sheetManager.sheet.classes !== this.cacheClasses.lastJSS) {
        this.cacheClasses.lastJSS = sheetManager.sheet.classes;
        generate = true;
      }
      if (this.props.classes !== this.cacheClasses.lastProp) {
        this.cacheClasses.lastProp = this.props.classes;
        generate = true;
      }

      if (generate) {
        this.cacheClasses.value = mergeClasses({
          baseClasses: this.cacheClasses.lastJSS,
          newClasses: this.props.classes,
          Component,
        });
      }

      return this.cacheClasses.value;
    }

    attach(theme) {
      if (this.disableStylesGeneration) {
        return;
      }

      const stylesCreatorSaved = this.stylesCreatorSaved;
      let sheetManager = multiKeyStore.get(this.sheetsManager, stylesCreatorSaved, theme);

      if (!sheetManager) {
        sheetManager = {
          refs: 0,
          sheet: null,
        };
        multiKeyStore.set(this.sheetsManager, stylesCreatorSaved, theme, sheetManager);
      }

      if (sheetManager.refs === 0) {
        let sheet;

        if (this.sheetsCache) {
          sheet = multiKeyStore.get(this.sheetsCache, stylesCreatorSaved, theme);
        }

        if (!sheet) {
          sheet = this.createSheet(theme);
          sheet.attach();

          if (this.sheetsCache) {
            multiKeyStore.set(this.sheetsCache, stylesCreatorSaved, theme, sheet);
          }
        }

        sheetManager.sheet = sheet;

        const sheetsRegistry = this.context[ns.sheetsRegistry];
        if (sheetsRegistry) {
          sheetsRegistry.add(sheet);
        }
      }

      sheetManager.refs += 1;
    }

    createSheet(theme) {
      const styles = this.stylesCreatorSaved.create(theme, name);
      let meta = name;

      if (process.env.NODE_ENV !== 'production' && !meta) {
        // Provide a better DX outside production.
        meta = getDisplayName(Component);
        warning(
          typeof meta === 'string',
          [
            'Material-UI: the component displayName is invalid. It needs to be a string.',
            `Please fix the following component: ${Component}.`,
          ].join('\n'),
        );
      }

      const sheet = this.jss.createStyleSheet(styles, {
        meta,
        classNamePrefix: meta,
        flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl',
        link: false,
        ...this.sheetOptions,
        ...this.stylesCreatorSaved.options,
        name: name || Component.displayName,
        ...styleSheetOptions,
      });

      return sheet;
    }

    detach(theme) {
      if (this.disableStylesGeneration) {
        return;
      }

      const sheetManager = multiKeyStore.get(this.sheetsManager, this.stylesCreatorSaved, theme);
      sheetManager.refs -= 1;

      if (sheetManager.refs === 0) {
        multiKeyStore.delete(this.sheetsManager, this.stylesCreatorSaved, theme);

        this.jss.removeStyleSheet(sheetManager.sheet);
        const sheetsRegistry = this.context[ns.sheetsRegistry];
        if (sheetsRegistry) {
          sheetsRegistry.remove(sheetManager.sheet);
        }
      }
    }

    render() {
      const { classes, innerRef, ...other } = this.props;

      const more = getThemeProps({ theme: this.theme, name, props: other });

      // Provide the theme to the wrapped component.
      // So we don't have to use the `withTheme` Higher-order Component.
      if (withTheme && !more.theme) {
        more.theme = this.theme;
      }

      return <Component {...more} classes={this.getClasses()} ref={innerRef} />;
    }
  }

  WithStyles.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object,
    /**
     * Use that property to pass a ref callback to the decorated component.
     */
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  };

  WithStyles.contextTypes = {
    muiThemeProviderOptions: PropTypes.object,
    [ns.jss]: PropTypes.object,
    [ns.sheetOptions]: PropTypes.object,
    [ns.sheetsRegistry]: PropTypes.object,
    ...(listenToTheme ? themeListener.contextTypes : {}),
  };

  if (process.env.NODE_ENV !== 'production') {
    WithStyles.displayName = `WithStyles(${getDisplayName(Component)})`;
  }

  hoistNonReactStatics(WithStyles, Component);

  if (process.env.NODE_ENV !== 'production') {
    // Exposed for test purposes.
    WithStyles.Naked = Component;
    WithStyles.options = options;
  }

  return WithStyles;
};

/* istanbul ignore if */
if (!ponyfillGlobal.__MUI_STYLES__) {
  ponyfillGlobal.__MUI_STYLES__ = {};
}

if (!ponyfillGlobal.__MUI_STYLES__.withStyles) {
  ponyfillGlobal.__MUI_STYLES__.withStyles = withStylesOld;
}

export default (styles, options) =>
  ponyfillGlobal.__MUI_STYLES__.withStyles(styles, {
    defaultTheme,
    ...options,
  });

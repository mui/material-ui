import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import hoistNonReactStatics from 'hoist-non-react-statics';
import getDisplayName from 'recompose/getDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';
import contextTypes from 'react-jss/lib/contextTypes';
import { create } from 'jss';
import * as ns from 'react-jss/lib/ns';
import jssPreset from './jssPreset';
import mergeClasses from './mergeClasses';
import createMuiTheme from './createMuiTheme';
import themeListener from './themeListener';
import createGenerateClassName from './createGenerateClassName';
import getStylesCreator from './getStylesCreator';
import getThemeProps from './getThemeProps';
import packageId from './packageId';

// Default JSS instance.
const jss = create(jssPreset());

// Use a singleton or the provided one by the context.
//
// The counter-based approach doesn't tolerate any mistake.
// It's much safer to use the same counter everywhere.
// However, because we allow people to get started without any configuration,
// we need to handle the generator duplication case. It can happen when more than one
// generator is used.
// We are avoiding class name collisions with a seed, one per package installation.
const generateClassName = createGenerateClassName({ seed: `${packageId}-` });

// Global index counter to preserve source order.
// We create the style sheet during at the creation of the component,
// children are handled after the parents, so the order of style elements would be parent->child.
// It is a problem though when a parent passes a className
// which needs to override any childs styles.
// StyleSheet of the child has a higher specificity, because of the source order.
// So our solution is to render sheets them in the reverse order child->sheet, so
// that parent has a higher specificity.
let indexCounter = -10e10;

// Exported for test purposes
export const sheetsManager = new Map();

// We use the same empty object to ref count the styles that don't need a theme object.
const noopTheme = {};

// In order to have self-supporting components, we rely on default theme when not provided.
let defaultTheme;

function getDefaultTheme() {
  if (defaultTheme) {
    return defaultTheme;
  }

  defaultTheme = createMuiTheme();
  return defaultTheme;
}

// Link a style sheet with a component.
// It does not modify the component passed to it;
// instead, it returns a new component, with a `classes` property.
const withStyles = (stylesOrCreator, options = {}) => Component => {
  const { withTheme = false, flip = null, name, ...styleSheetOptions } = options;
  const stylesCreator = getStylesCreator(stylesOrCreator);
  const listenToTheme = stylesCreator.themingEnabled || withTheme || typeof name === 'string';

  indexCounter += 1;
  stylesCreator.options.index = indexCounter;

  warning(
    indexCounter < 0,
    [
      'Material-UI: you might have a memory leak.',
      'The indexCounter is not supposed to grow that much.',
    ].join(' '),
  );

  class WithStyles extends React.Component {
    disableStylesGeneration = false;

    jss = null;

    sheetOptions = null;

    sheetsManager = sheetsManager;

    stylesCreatorSaved = null;

    theme = null;

    unsubscribeId = null;

    constructor(props, context) {
      super(props, context);
      this.jss = context[ns.jss] || jss;

      const { muiThemeProviderOptions } = context;
      if (muiThemeProviderOptions) {
        if (muiThemeProviderOptions.sheetsManager) {
          this.sheetsManager = muiThemeProviderOptions.sheetsManager;
        }

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
      this.theme = listenToTheme ? themeListener.initial(context) || getDefaultTheme() : noopTheme;

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

    state = {};

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
      // Tracks if either the rendered classes or classes prop has changed,
      // requiring the generation of a new finalized classes object.
      let generate = false;

      if (!this.disableStylesGeneration) {
        const sheetManager = this.sheetsManager.get(this.stylesCreatorSaved);
        const sheetsManagerTheme = sheetManager.get(this.theme);
        if (sheetsManagerTheme.sheet.classes !== this.cacheClasses.lastJSS) {
          this.cacheClasses.lastJSS = sheetsManagerTheme.sheet.classes;
          generate = true;
        }
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
          noBase: this.disableStylesGeneration,
        });
      }

      return this.cacheClasses.value;
    }

    attach(theme) {
      if (this.disableStylesGeneration) {
        return;
      }

      const stylesCreatorSaved = this.stylesCreatorSaved;
      let sheetManager = this.sheetsManager.get(stylesCreatorSaved);

      if (!sheetManager) {
        sheetManager = new Map();
        this.sheetsManager.set(stylesCreatorSaved, sheetManager);
      }

      let sheetManagerTheme = sheetManager.get(theme);

      if (!sheetManagerTheme) {
        sheetManagerTheme = {
          refs: 0,
          sheet: null,
        };
        sheetManager.set(theme, sheetManagerTheme);
      }

      if (sheetManagerTheme.refs === 0) {
        const styles = stylesCreatorSaved.create(theme, name);
        let meta = name;

        if (process.env.NODE_ENV !== 'production' && !meta) {
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
          ...stylesCreatorSaved.options,
          name,
          ...styleSheetOptions,
        });

        sheetManagerTheme.sheet = sheet;
        sheet.attach();

        const sheetsRegistry = this.context[ns.sheetsRegistry];
        if (sheetsRegistry) {
          sheetsRegistry.add(sheet);
        }
      }

      sheetManagerTheme.refs += 1;
    }

    detach(theme) {
      if (this.disableStylesGeneration) {
        return;
      }

      const stylesCreatorSaved = this.stylesCreatorSaved;
      const sheetManager = this.sheetsManager.get(stylesCreatorSaved);
      const sheetManagerTheme = sheetManager.get(theme);

      sheetManagerTheme.refs -= 1;

      if (sheetManagerTheme.refs === 0) {
        sheetManager.delete(theme);
        this.jss.removeStyleSheet(sheetManagerTheme.sheet);
        const sheetsRegistry = this.context[ns.sheetsRegistry];
        if (sheetsRegistry) {
          sheetsRegistry.remove(sheetManagerTheme.sheet);
        }
      }
    }

    render() {
      const { classes, innerRef, ...other } = this.props;

      const more = getThemeProps({ theme: this.theme, name, props: other });

      // Provide the theme to the wrapped component.
      // So we don't have to use the `withTheme()` Higher-order Component.
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
    ...contextTypes,
    ...(listenToTheme ? themeListener.contextTypes : {}),
  };

  if (process.env.NODE_ENV !== 'production') {
    WithStyles.displayName = wrapDisplayName(Component, 'WithStyles');
  }

  hoistNonReactStatics(WithStyles, Component);

  if (process.env.NODE_ENV !== 'production') {
    // Exposed for test purposes.
    WithStyles.Naked = Component;
    WithStyles.options = options;
  }

  return WithStyles;
};

export default withStyles;

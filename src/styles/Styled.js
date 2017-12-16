import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import getDisplayName from 'recompose/getDisplayName';
import jssContextTypes from 'react-jss/lib/contextTypes';
import { create } from 'jss';
import jssGlobal from 'jss-global';
import jssNested from 'jss-nested';
import jssCamelCase from 'jss-camel-case';
import jssDefaultUnit from 'jss-default-unit';
import jssVendorPrefixer from 'jss-vendor-prefixer';
import jssPropsSort from 'jss-props-sort';
import * as ns from 'react-jss/lib/ns';
import createMuiTheme from './createMuiTheme';
import themeListener from './themeListener';
import createGenerateClassName from './createGenerateClassName';
import getStylesCreator from './getStylesCreator';

export const preset = () => ({
  plugins: [
    jssGlobal(),
    jssNested(),
    jssCamelCase(),
    jssDefaultUnit(),
    jssVendorPrefixer(),
    jssPropsSort(),
  ],
});

// New JSS instance.
const jss = create(preset());

// Use a singleton or the provided one by the context.
const generateClassName = createGenerateClassName();

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

class Styled extends React.Component {
  constructor(props, context) {
    super(props, context);

    const { muiThemeProviderOptions } = this.context;

    this.jss = this.context[ns.jss] || jss;

    if (muiThemeProviderOptions) {
      if (muiThemeProviderOptions.sheetsManager) {
        this.sheetsManager = muiThemeProviderOptions.sheetsManager;
      }

      this.disableStylesGeneration = muiThemeProviderOptions.disableStylesGeneration;
    }

    this.stylesCreator = getStylesCreator(props.styles);
    warning(
      this.stylesCreator.options.index < 0,
      [
        'Material-UI: you might have a memory leak.',
        'The indexCounter is not supposed to grow that much.',
      ].join(' '),
    );

    // FIXME: props.withTheme is NOT needed here, it is legacy and only leftover from
    // FIXME:   withStyles usage.  I don't know why it is needed for listening -
    // FIXME:   this is a good question for Olivier. For now, it is passed in, but
    // FIXME    props.withTheme should be removed
    this.listenToTheme =
      this.stylesCreator.themingEnabled || props.withTheme || typeof props.name === 'string';

    // Attach the stylesCreator to the instance of the component as in the context
    // of react-hot-loader the hooks can be executed in a different closure context:
    // https://github.com/gaearon/react-hot-loader/blob/master/src/patch.dev.js#L107
    this.stylesCreatorSaved = this.stylesCreator;
    this.sheetOptions = {
      generateClassName,
      ...this.context[ns.sheetOptions],
    };
    // We use || as it's lazy evaluated.
    this.theme = this.listenToTheme
      ? themeListener.initial(context) || getDefaultTheme()
      : noopTheme;
  }

  state = {};

  componentWillMount() {
    this.attach(this.theme);
  }

  componentDidMount() {
    if (!this.listenToTheme) {
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

  componentWillReceiveProps() {
    // react-hot-loader specific logic
    if (this.stylesCreatorSaved === this.stylesCreator || process.env.NODE_ENV === 'production') {
      return;
    }

    this.detach(this.theme);
    this.stylesCreatorSaved = this.stylesCreator;
    this.attach(this.theme);
  }

  componentWillUnmount() {
    this.detach(this.theme);

    if (this.unsubscribeId !== null) {
      themeListener.unsubscribe(this.context, this.unsubscribeId);
    }
  }

  attach(theme) {
    if (this.disableStylesGeneration) {
      return;
    }

    const { Component, flip, name } = this.props;
    let sheetManager = this.sheetsManager.get(this.stylesCreatorSaved);

    if (!sheetManager) {
      sheetManager = new Map();
      this.sheetsManager.set(this.stylesCreatorSaved, sheetManager);
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
      const styles = this.stylesCreatorSaved.create(theme, name);
      let meta;

      if (process.env.NODE_ENV !== 'production') {
        // REVIEW this is going to be bogus - can't have every stylesheet used this way
        //  popping out as 'Styled'
        meta = name || (Component ? getDisplayName(Component) : 'Styled');
      }

      const sheet = this.jss.createStyleSheet(styles, {
        meta,
        flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl',
        link: false,
        ...this.sheetOptions,
        ...this.stylesCreatorSaved.options,
        name,
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

    const sheetManager = this.sheetsManager.get(this.stylesCreatorSaved);
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

  unsubscribeId = null;
  jss = null;
  sheetsManager = sheetsManager;
  disableStylesGeneration = false;
  stylesCreator = null;
  stylesCreatorSaved = null;
  theme = null;
  sheetOptions = null;
  theme = null;

  render() {
    const { children, classes: classesProp, Component } = this.props;

    let classes;
    let renderedClasses = {};

    if (!this.disableStylesGeneration) {
      const sheetManager = this.sheetsManager.get(this.stylesCreatorSaved);
      const sheetsManagerTheme = sheetManager.get(this.theme);
      renderedClasses = sheetsManagerTheme.sheet.classes;
    }

    if (classesProp) {
      classes = {
        ...renderedClasses,
        ...Object.keys(classesProp).reduce((accumulator, key) => {
          warning(
            renderedClasses[key] || this.disableStylesGeneration,
            [
              `Material-UI: the key \`${key}\` ` +
                'provided to the classes property is not implemented in ' +
                `${Component ? getDisplayName(Component) : 'component'}.`,
              `You can only override one of the following: ${Object.keys(renderedClasses).join(
                ',',
              )}`,
            ].join('\n'),
          );

          warning(
            !classesProp[key] || typeof classesProp[key] === 'string',
            [
              `Material-UI: the key \`${key}\` ` +
                `provided to the classes property is not valid for ${getDisplayName(Component)}.`,
              `You need to provide a non empty string instead of: ${classesProp[key]}.`,
            ].join('\n'),
          );

          if (classesProp[key]) {
            accumulator[key] = `${renderedClasses[key]} ${classesProp[key]}`;
          }

          return accumulator;
        }, {}),
      };
    } else {
      classes = renderedClasses;
    }

    return children(classes, this.theme);
  }
}

Styled.propTypes = {
  children: PropTypes.func,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object,
  /**
   * @ignore only for better messages when used with withStyles
   */
  Component: PropTypes.func,
  /**
   * Override theme rendering right to left (rtl).
   */
  flip: PropTypes.bool,
  /**
   * StyleSheet name for the component.
   */
  name: PropTypes.string,
  /**
   * Styles object or function that accepts the Theme and returns an object.
   */
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  /**
   * @ignore see note in constructor - this should be unnecessary in this component pattern
   */
  withTheme: PropTypes.bool,
};

Styled.contextTypes = {
  muiThemeProviderOptions: PropTypes.object,
  ...jssContextTypes,
  ...themeListener.contextTypes, // REVIEW (listenToTheme ? themeListener.contextTypes : {}),
};

export default Styled;

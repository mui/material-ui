// @flow weak

import React from 'react';
import type { ComponentType } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import hoistNonReactStatics from 'hoist-non-react-statics';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createEagerFactory from 'recompose/createEagerFactory';
import getDisplayName from 'recompose/getDisplayName';
import contextTypes from 'react-jss/lib/contextTypes';
import jss from 'react-jss/lib/jss';
import * as ns from 'react-jss/lib/ns';
import createMuiTheme from './createMuiTheme';
import themeListener from './themeListener';
import createGenerateClassName from './createGenerateClassName';
import getStylesCreator from './getStylesCreator';

// Use a singleton or the provided one by the context.
const generateClassName = createGenerateClassName();

// Global index counter to preserve source order.
// As we create the style sheet during componentWillMount lifecycle,
// children are handled after the parents, so the order of style elements would
// be parent->child. It is a problem though when a parent passes a className
// which needs to override any childs styles. StyleSheet of the child has a higher
// specificity, because of the source order.
// So our solution is to render sheets them in the reverse order child->sheet, so
// that parent has a higher specificity.
let indexCounter = Number.MIN_SAFE_INTEGER;

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

type Options = {
  withTheme?: boolean,
  name?: string,

  // Problem: https://github.com/brigand/babel-plugin-flow-react-proptypes/issues/127
  // import type { StyleSheetFactoryOptions } from 'jss/lib/types';
  //  ...StyleSheetFactoryOptions,
  // and the fact that we currently cannot import/spread types with
  //  https://github.com/brigand/babel-plugin-flow-react-proptypes/issues/106
  media?: string,
  meta?: string,
  index?: number,
  link?: boolean,
  element?: HTMLStyleElement,
  generateClassName?: Function, // generateClassName - use generic to stop the bleeding.
};

// Link a style sheet with a component.
// It does not modify the component passed to it;
// instead, it returns a new, with a `classes` property.
function withStyles(stylesOrCreator: Object, options?: Options = {}) {
  function enhance<BaseProps: {}>(BaseComponent: ComponentType<BaseProps>) {
    const { withTheme = false, name, ...styleSheetOptions } = options;
    const factory = createEagerFactory(BaseComponent);
    const stylesCreators = [getStylesCreator(stylesOrCreator)];
    const listenToTheme =
      stylesCreators.some(stylesCreator => stylesCreator.themingEnabled) ||
      withTheme ||
      typeof name === 'string';

    stylesCreators.forEach(stylesCreator => {
      if (stylesCreator.options.index === undefined) {
        indexCounter += 1;
        stylesCreator.options.index = indexCounter;
      }
    });

    warning(
      indexCounter < 0,
      [
        'Material-UI: you might have a memory leak.',
        'The indexCounter is not supposed to grow that much.',
      ].join(' '),
    );

    type StyleProps = {
      /**
       * Useful to extend the style applied to components.
       */
      classes?: Object,
      /**
       * Use that property to pass a ref callback to the decorated component.
       */
      innerRef?: Function,
    };

    type AllProps = StyleProps & BaseProps;
    class Style extends React.Component<AllProps, {}> {
      props: AllProps;
      static contextTypes = {
        sheetsManager: PropTypes.object,
        ...contextTypes,
        ...(listenToTheme ? themeListener.contextTypes : {}),
      };
      // Exposed for tests purposes
      static options: ?Options = options;
      // Exposed for test purposes.
      static Naked = BaseComponent;

      constructor(props: AllProps, context: Object) {
        super(props, context);
        this.jss = this.context[ns.jss] || jss;
        this.sheetsManager = this.context.sheetsManager || sheetsManager;
        // Attach the stylesCreators to the instance of the component as in the context
        // of react-hot-loader the hooks can be executed in a different closure context:
        // https://github.com/gaearon/react-hot-loader/blob/master/src/patch.dev.js#L107
        this.stylesCreators = stylesCreators;
        this.sheetOptions = {
          generateClassName,
          ...this.context[ns.sheetOptions],
        };
        // We use || as it's lazy evaluated.
        this.theme = listenToTheme
          ? themeListener.initial(context) || getDefaultTheme()
          : noopTheme;
      }

      state = {};

      componentWillMount() {
        this.attach(this.theme);
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
          this.setState({}, () => {
            this.detach(oldTheme);
          });
        });
      }

      componentWillUnmount() {
        this.detach(this.theme);

        if (this.unsubscribeId !== null) {
          themeListener.unsubscribe(this.context, this.unsubscribeId);
        }
      }

      attach(theme: Object) {
        this.stylesCreators.forEach(stylesCreator => {
          let sheetManager = this.sheetsManager.get(stylesCreator);

          if (!sheetManager) {
            sheetManager = new Map();
            this.sheetsManager.set(stylesCreator, sheetManager);
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
            const styles = stylesCreator.create(theme, name);
            let meta;

            if (process.env.NODE_ENV !== 'production') {
              meta = name || getDisplayName(BaseComponent);
              // Sanitize the string as will be used in development to prefix the generated
              // class name.
              meta = meta.replace(new RegExp(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g), '-');
            }

            const sheet = this.jss.createStyleSheet(styles, {
              meta,
              link: false,
              ...this.sheetOptions,
              ...stylesCreator.options,
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
        });
      }

      detach(theme: Object) {
        this.stylesCreators.forEach(stylesCreator => {
          const sheetManager = this.sheetsManager.get(stylesCreator);
          const sheetManagerTheme = sheetManager.get(theme);

          sheetManagerTheme.refs -= 1;

          if (sheetManagerTheme.refs === 0) {
            sheetManager.delete(theme);
            sheetManagerTheme.sheet.detach();
            const sheetsRegistry = this.context[ns.sheetsRegistry];
            if (sheetsRegistry) {
              sheetsRegistry.remove(sheetManagerTheme.sheet);
            }
          }
        });
      }

      unsubscribeId = null;
      jss = null;
      sheetsManager = null;
      stylesCreators = null;
      theme = null;
      sheetOptions = null;
      theme = null;

      render() {
        const { classes: classesProp, innerRef, ...other } = this.props;

        let classes;
        const renderedClasses = this.stylesCreators.reduce((accumulator, current) => {
          const sheetManager = this.sheetsManager.get(current);
          const sheetsManagerTheme = sheetManager.get(this.theme);

          return {
            ...accumulator,
            ...sheetsManagerTheme.sheet.classes,
          };
        }, {});

        if (classesProp) {
          classes = {
            ...renderedClasses,
            ...Object.keys(classesProp).reduce((accumulator, key) => {
              warning(
                renderedClasses[key],
                [
                  `Material-UI: the key \`${key}\` ` +
                    `provided to the classes property object is not implemented in ${getDisplayName(
                      BaseComponent,
                    )}.`,
                  `You can only overrides one of the following: ${Object.keys(renderedClasses).join(
                    ',',
                  )}`,
                ].join('\n'),
              );

              if (classesProp[key] !== undefined) {
                accumulator[key] = `${renderedClasses[key]} ${classesProp[key]}`;
              }
              return accumulator;
            }, {}),
          };
        } else {
          classes = renderedClasses;
        }

        const more = {};

        // Provide the theme to the wrapped component.
        // So we don't have to use the `withTheme()` Higher-order component.
        if (withTheme) {
          more.theme = this.theme;
        }

        return factory({
          classes,
          ref: innerRef,
          ...more,
          ...other,
        });
      }
    }

    hoistNonReactStatics(Style, BaseComponent);

    if (process.env.NODE_ENV !== 'production') {
      Style.displayName = wrapDisplayName(BaseComponent, 'withStyles');
    }

    return Style;
  }

  return enhance;
}

export default withStyles;

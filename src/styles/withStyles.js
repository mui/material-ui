// @flow weak

import { Component } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import hoistNonReactStatics from 'hoist-non-react-statics';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createEagerFactory from 'recompose/createEagerFactory';
import customPropTypes from '../utils/customPropTypes';

// Link a style sheet with a component.
// It does not modify the component passed to it;
// instead, it returns a new, with a `classes` property.
const withStyles = styleSheet => BaseComponent => {
  const factory = createEagerFactory(BaseComponent);

  class Style extends Component {
    // Exposed for test purposes.
    static Naked = BaseComponent;

    render() {
      const { classes: classesProp, innerRef, ...other } = this.props;

      let classes;
      const renderedClasses = this.context.styleManager.render(styleSheet);

      if (classesProp) {
        classes = {
          ...renderedClasses,
          ...Object.keys(classesProp).reduce((acc, key) => {
            warning(
              renderedClasses[key],
              `Material-UI: the key \`${key}\` ` +
                'provided to the classes property object is not implemented.',
            );

            acc[key] = `${renderedClasses[key]} ${classesProp[key]}`;
            return acc;
          }, {}),
        };
      } else {
        classes = renderedClasses;
      }

      return factory({
        classes,
        ref: innerRef,
        ...other,
      });
    }
  }

  Style.propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object,
    /**
     * Use that property to pass a ref callback to the decorated component.
     */
    innerRef: PropTypes.func,
  };

  Style.contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  hoistNonReactStatics(Style, BaseComponent);

  if (process.env.NODE_ENV !== 'production') {
    Style.displayName = wrapDisplayName(BaseComponent, 'withStyles');
  }

  return Style;
};

export default withStyles;

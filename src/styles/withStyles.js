// @flow weak

import warning from 'warning';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createEagerFactory from 'recompose/createEagerFactory';
import customPropTypes from '../utils/customPropTypes';

// Link a style sheet with a component.
// It does not modify the component passed to it;
// instead, it returns a new, with a `classes` property.
// This classes object contains the name of the class names injected in the DOM.
const withStyles = (styleSheet) => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);

  const Style = (ownerProps, context) => {
    const {
      classes: classesProp,
      ...other
    } = ownerProps;

    let classes;
    const renderedClasses = context.styleManager.render(styleSheet);

    if (classesProp) {
      classes = {
        ...renderedClasses,
        ...Object.keys(classesProp).reduce((acc, key) => {
          warning(renderedClasses[key],
            `Material-UI: the key \`${key
            }\` provided to the classes property object is not implemented.`);

          acc[key] = `${renderedClasses[key]} ${classesProp[key]}`;
          return acc;
        }, {}),
      };
    } else {
      classes = renderedClasses;
    }

    return factory({
      classes,
      ...other,
    });
  };

  Style.contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  if (process.env.NODE_ENV !== 'production') {
    Style.displayName = wrapDisplayName(BaseComponent, 'withStyles');
  }

  return Style;
};

export default withStyles;

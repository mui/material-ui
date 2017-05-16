// @flow weak

import wrapDisplayName from 'recompose/wrapDisplayName';
import createEagerFactory from 'recompose/createEagerFactory';
import customPropTypes from '../utils/customPropTypes';

// Link a style sheet with a component.
// It does not modity the component passed to it;
// instead, it returns a new, with a classes property.
// This classes object contains the name of the class names injected in the DOM.
const withStyles = (styleSheet) => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);

  const Style = (ownerProps, context) => (
    factory({
      classes: context.styleManager.render(styleSheet),
      ...ownerProps,
    })
  );

  Style.contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  if (process.env.NODE_ENV !== 'production') {
    Style.displayName = wrapDisplayName(BaseComponent, 'withStyles');
  }

  return Style;
};

export default withStyles;

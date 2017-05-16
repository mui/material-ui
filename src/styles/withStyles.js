// @flow weak

import createHelper from 'recompose/createHelper';
import createEagerFactory from 'recompose/createEagerFactory';
import customPropTypes from '../utils/customPropTypes';

// Link a style sheet with a component.
// It does not modity the component passed to it;
// instead, it returns a new, with a classes property.
// This classes object contains the name of the class names injected in the DOM.
const withStyles = (styleSheet) => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);

  const WithStyle = (ownerProps, context) => (
    factory({
      classes: context.styleManager.render(styleSheet),
      ...ownerProps,
    })
  );

  WithStyle.contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  return WithStyle;
};

export default createHelper(withStyles, 'withStyles');

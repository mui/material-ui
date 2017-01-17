// @flow weak

import createHelper from 'recompose/createHelper';
import createEagerFactory from 'recompose/createEagerFactory';
import customPropTypes from '../utils/customPropTypes';

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

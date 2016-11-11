// @flow weak

import { PropTypes } from 'react';
import createHelper from 'recompose/createHelper';
import createEagerFactory from 'recompose/createEagerFactory';

const withStyles = (styleSheet) => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);

  const WithStyle = (ownerProps, context) => (
    factory({
      ...ownerProps,
      classes: context.styleManager.render(styleSheet),
    })
  );

  WithStyle.contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  return WithStyle;
};

export default createHelper(withStyles, 'withStyles');

// @flow weak

import { PropTypes } from 'react';
import createHelper from 'recompose/createHelper';
import createEagerFactory from 'recompose/createEagerFactory';

const withStyles = (styleSheet) => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);

  const WithStyle = (ownerProps, context) => (
    factory({
      classes: context.styleManager.render(styleSheet),
      ...ownerProps,
    })
  );

  WithStyle.contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  return WithStyle;
};

export default createHelper(withStyles, 'withStyles');

// @flow weak

import createEagerFactory from 'recompose/createEagerFactory';
import wrapDisplayName from 'recompose/wrapDisplayName';
import customPropTypes from '../utils/customPropTypes';

const withTheme = (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);

  const WithTheme = (ownerProps, context) => (
    factory({ theme: context.theme, ...ownerProps })
  );

  WithTheme.contextTypes = {
    theme: customPropTypes.muiRequired,
  };

  WithTheme.displayName = wrapDisplayName(BaseComponent, 'withTheme');

  return WithTheme;
};

export default withTheme;

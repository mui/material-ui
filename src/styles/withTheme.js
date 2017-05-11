// @flow weak

import createEagerFactory from 'recompose/createEagerFactory';
import wrapDisplayName from 'recompose/wrapDisplayName';
import customPropTypes from '../utils/customPropTypes';

// Provide the theme object as a property to the input component.
export default function withTheme(BaseComponent) {
  const factory = createEagerFactory(BaseComponent);

  const WithTheme = (ownerProps, context) => (
    factory({ theme: context.theme, ...ownerProps })
  );

  WithTheme.contextTypes = {
    theme: customPropTypes.muiRequired,
  };
  WithTheme.displayName = wrapDisplayName(BaseComponent, 'withTheme');

  return WithTheme;
}

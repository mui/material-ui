import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let NavigationApps = (props) => (
  <SvgIcon {...props}>
    <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
  </SvgIcon>
);
NavigationApps = pure(NavigationApps)
NavigationApps.displayName = 'NavigationApps';

export default NavigationApps;

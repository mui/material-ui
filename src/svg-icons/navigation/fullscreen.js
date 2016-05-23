import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let NavigationFullscreen = (props) => (
  <SvgIcon {...props}>
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
  </SvgIcon>
);
NavigationFullscreen = pure(NavigationFullscreen);
NavigationFullscreen.displayName = 'NavigationFullscreen';
NavigationFullscreen.muiName = 'SvgIcon';

export default NavigationFullscreen;

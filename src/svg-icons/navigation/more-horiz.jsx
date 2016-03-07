import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let NavigationMoreHoriz = (props) => (
  <SvgIcon {...props}>
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </SvgIcon>
);
NavigationMoreHoriz = pure(NavigationMoreHoriz)
NavigationMoreHoriz.displayName = 'NavigationMoreHoriz';

export default NavigationMoreHoriz;

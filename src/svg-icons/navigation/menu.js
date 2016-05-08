import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let NavigationMenu = (props) => (
  <SvgIcon {...props}>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
  </SvgIcon>
);
NavigationMenu = pure(NavigationMenu);
NavigationMenu.displayName = 'NavigationMenu';
NavigationMenu.muiName = 'SvgIcon';

export default NavigationMenu;

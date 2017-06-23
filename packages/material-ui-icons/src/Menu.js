import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Menu = props =>
  <SvgIcon {...props}>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </SvgIcon>;

Menu = pure(Menu);
Menu.muiName = 'SvgIcon';

export default Menu;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let KeyboardTab = props =>
  <SvgIcon {...props}>
    <path d="M11.59 7.41L15.17 11H1v2h14.17l-3.59 3.59L13 18l6-6-6-6-1.41 1.41zM20 6v12h2V6h-2z" />
  </SvgIcon>;

KeyboardTab = pure(KeyboardTab);
KeyboardTab.muiName = 'SvgIcon';

export default KeyboardTab;

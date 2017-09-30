import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let Send = props =>
  <SvgIconCustom {...props}>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </SvgIconCustom>;

Send = pure(Send);
Send.muiName = 'SvgIcon';

export default Send;

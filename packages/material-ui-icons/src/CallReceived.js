import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let CallReceived = props =>
  <SvgIconCustom {...props}>
    <path d="M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z" />
  </SvgIconCustom>;

CallReceived = pure(CallReceived);
CallReceived.muiName = 'SvgIcon';

export default CallReceived;

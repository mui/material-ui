import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let CallReceived = props =>
  <SvgIcon {...props}>
    <path d="M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z" />
  </SvgIcon>;

CallReceived = pure(CallReceived);
CallReceived.muiName = 'SvgIcon';

export default CallReceived;

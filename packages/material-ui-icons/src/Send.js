import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Send = props =>
  <SvgIcon {...props}>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </SvgIcon>;

Send = pure(Send);
Send.muiName = 'SvgIcon';

export default Send;

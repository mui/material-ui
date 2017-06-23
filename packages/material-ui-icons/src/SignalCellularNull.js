import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SignalCellularNull = props =>
  <SvgIcon {...props}>
    <path d="M20 6.83V20H6.83L20 6.83M22 2L2 22h20V2z" />
  </SvgIcon>;

SignalCellularNull = pure(SignalCellularNull);
SignalCellularNull.muiName = 'SvgIcon';

export default SignalCellularNull;

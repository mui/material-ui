import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SignalCellular4Bar = props =>
  <SvgIcon {...props}>
    <path d="M2 22h20V2z" />
  </SvgIcon>;

SignalCellular4Bar = pure(SignalCellular4Bar);
SignalCellular4Bar.muiName = 'SvgIcon';

export default SignalCellular4Bar;

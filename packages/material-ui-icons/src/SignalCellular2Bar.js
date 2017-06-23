import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SignalCellular2Bar = props =>
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M2 22h20V2z" /><path d="M14 10L2 22h12z" />
  </SvgIcon>;

SignalCellular2Bar = pure(SignalCellular2Bar);
SignalCellular2Bar.muiName = 'SvgIcon';

export default SignalCellular2Bar;

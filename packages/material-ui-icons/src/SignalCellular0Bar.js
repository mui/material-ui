import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SignalCellular0Bar = props =>
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M2 22h20V2z" />
  </SvgIcon>;

SignalCellular0Bar = pure(SignalCellular0Bar);
SignalCellular0Bar.muiName = 'SvgIcon';

export default SignalCellular0Bar;

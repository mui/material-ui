import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let SignalCellular2Bar = props =>
  <SvgIconCustom {...props}>
    <path fillOpacity=".3" d="M2 22h20V2z" /><path d="M14 10L2 22h12z" />
  </SvgIconCustom>;

SignalCellular2Bar = pure(SignalCellular2Bar);
SignalCellular2Bar.muiName = 'SvgIcon';

export default SignalCellular2Bar;

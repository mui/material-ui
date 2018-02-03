import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let SignalCellular0Bar = props =>
  <SvgIconCustom {...props}>
    <path fillOpacity=".3" d="M2 22h20V2z" />
  </SvgIconCustom>;

SignalCellular0Bar = pure(SignalCellular0Bar);
SignalCellular0Bar.muiName = 'SvgIcon';

export default SignalCellular0Bar;

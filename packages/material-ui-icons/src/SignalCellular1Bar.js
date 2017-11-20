import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let SignalCellular1Bar = props =>
  <SvgIconCustom {...props}>
    <path fillOpacity=".3" d="M2 22h20V2z" /><path d="M12 12L2 22h10z" />
  </SvgIconCustom>;

SignalCellular1Bar = pure(SignalCellular1Bar);
SignalCellular1Bar.muiName = 'SvgIcon';

export default SignalCellular1Bar;

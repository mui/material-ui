import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SignalCellularConnectedNoInternet1Bar = props =>
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M22 8V2L2 22h16V8z" /><path d="M20 10v8h2v-8h-2zm-8 12V12L2 22h10zm8 0h2v-2h-2v2z" />
  </SvgIcon>;

SignalCellularConnectedNoInternet1Bar = pure(SignalCellularConnectedNoInternet1Bar);
SignalCellularConnectedNoInternet1Bar.muiName = 'SvgIcon';

export default SignalCellularConnectedNoInternet1Bar;

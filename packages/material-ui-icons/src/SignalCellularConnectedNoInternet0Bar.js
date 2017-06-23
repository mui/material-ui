import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SignalCellularConnectedNoInternet0Bar = props =>
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M22 8V2L2 22h16V8z" /><path d="M20 22h2v-2h-2v2zm0-12v8h2v-8h-2z" />
  </SvgIcon>;

SignalCellularConnectedNoInternet0Bar = pure(SignalCellularConnectedNoInternet0Bar);
SignalCellularConnectedNoInternet0Bar.muiName = 'SvgIcon';

export default SignalCellularConnectedNoInternet0Bar;

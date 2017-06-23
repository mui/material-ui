import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SignalWifi0Bar = props =>
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" />
  </SvgIcon>;

SignalWifi0Bar = pure(SignalWifi0Bar);
SignalWifi0Bar.muiName = 'SvgIcon';

export default SignalWifi0Bar;

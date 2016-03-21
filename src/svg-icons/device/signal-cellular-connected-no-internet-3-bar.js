import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceSignalCellularConnectedNoInternet3Bar = (props) => (
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M22 8V2L2 22h16V8z"/><path d="M17 22V7L2 22h15zm3-12v8h2v-8h-2zm0 12h2v-2h-2v2z"/>
  </SvgIcon>
);
DeviceSignalCellularConnectedNoInternet3Bar = pure(DeviceSignalCellularConnectedNoInternet3Bar);
DeviceSignalCellularConnectedNoInternet3Bar.displayName = 'DeviceSignalCellularConnectedNoInternet3Bar';

export default DeviceSignalCellularConnectedNoInternet3Bar;

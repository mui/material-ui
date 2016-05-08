import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceSignalCellularConnectedNoInternet2Bar = (props) => (
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M22 8V2L2 22h16V8z"/><path d="M14 22V10L2 22h12zm6-12v8h2v-8h-2zm0 12h2v-2h-2v2z"/>
  </SvgIcon>
);
DeviceSignalCellularConnectedNoInternet2Bar = pure(DeviceSignalCellularConnectedNoInternet2Bar);
DeviceSignalCellularConnectedNoInternet2Bar.displayName = 'DeviceSignalCellularConnectedNoInternet2Bar';
DeviceSignalCellularConnectedNoInternet2Bar.muiName = 'SvgIcon';

export default DeviceSignalCellularConnectedNoInternet2Bar;

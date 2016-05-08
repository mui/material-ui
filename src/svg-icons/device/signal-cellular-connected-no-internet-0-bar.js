import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceSignalCellularConnectedNoInternet0Bar = (props) => (
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M22 8V2L2 22h16V8z"/><path d="M20 22h2v-2h-2v2zm0-12v8h2v-8h-2z"/>
  </SvgIcon>
);
DeviceSignalCellularConnectedNoInternet0Bar = pure(DeviceSignalCellularConnectedNoInternet0Bar);
DeviceSignalCellularConnectedNoInternet0Bar.displayName = 'DeviceSignalCellularConnectedNoInternet0Bar';
DeviceSignalCellularConnectedNoInternet0Bar.muiName = 'SvgIcon';

export default DeviceSignalCellularConnectedNoInternet0Bar;

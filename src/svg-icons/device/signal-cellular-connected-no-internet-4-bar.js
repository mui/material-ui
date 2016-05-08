import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceSignalCellularConnectedNoInternet4Bar = (props) => (
  <SvgIcon {...props}>
    <path d="M20 18h2v-8h-2v8zm0 4h2v-2h-2v2zM2 22h16V8h4V2L2 22z"/>
  </SvgIcon>
);
DeviceSignalCellularConnectedNoInternet4Bar = pure(DeviceSignalCellularConnectedNoInternet4Bar);
DeviceSignalCellularConnectedNoInternet4Bar.displayName = 'DeviceSignalCellularConnectedNoInternet4Bar';
DeviceSignalCellularConnectedNoInternet4Bar.muiName = 'SvgIcon';

export default DeviceSignalCellularConnectedNoInternet4Bar;

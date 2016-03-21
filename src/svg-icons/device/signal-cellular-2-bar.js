import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceSignalCellular2Bar = (props) => (
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M2 22h20V2z"/><path d="M14 10L2 22h12z"/>
  </SvgIcon>
);
DeviceSignalCellular2Bar = pure(DeviceSignalCellular2Bar);
DeviceSignalCellular2Bar.displayName = 'DeviceSignalCellular2Bar';

export default DeviceSignalCellular2Bar;

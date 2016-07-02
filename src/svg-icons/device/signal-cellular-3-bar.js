import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceSignalCellular3Bar = (props) => (
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M2 22h20V2z"/><path d="M17 7L2 22h15z"/>
  </SvgIcon>
);
DeviceSignalCellular3Bar = pure(DeviceSignalCellular3Bar);
DeviceSignalCellular3Bar.displayName = 'DeviceSignalCellular3Bar';
DeviceSignalCellular3Bar.muiName = 'SvgIcon';

export default DeviceSignalCellular3Bar;

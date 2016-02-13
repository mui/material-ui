import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let DeviceSignalCellular0Bar = (props) => (
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M2 22h20V2z"/>
  </SvgIcon>
);
DeviceSignalCellular0Bar = pure(DeviceSignalCellular0Bar)
DeviceSignalCellular0Bar.displayName = 'DeviceSignalCellular0Bar';

export default DeviceSignalCellular0Bar;

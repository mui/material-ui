import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceSignalCellular1Bar = (props) => (
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M2 22h20V2z"/><path d="M12 12L2 22h10z"/>
  </SvgIcon>
);
DeviceSignalCellular1Bar = pure(DeviceSignalCellular1Bar);
DeviceSignalCellular1Bar.displayName = 'DeviceSignalCellular1Bar';

export default DeviceSignalCellular1Bar;

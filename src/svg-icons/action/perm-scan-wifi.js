import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionPermScanWifi = (props) => (
  <SvgIcon {...props}>
    <path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm-2-8V6h2v2h-2z"/>
  </SvgIcon>
);
ActionPermScanWifi = pure(ActionPermScanWifi);
ActionPermScanWifi.displayName = 'ActionPermScanWifi';

export default ActionPermScanWifi;

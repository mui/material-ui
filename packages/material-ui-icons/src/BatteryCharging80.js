import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let BatteryCharging80 = props =>
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V9h4.93L13 7v2h4V5.33C17 4.6 16.4 4 15.67 4z" /><path d="M13 12.5h2L11 20v-5.5H9L11.93 9H7v11.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V9h-4v3.5z" />
  </SvgIcon>;

BatteryCharging80 = pure(BatteryCharging80);
BatteryCharging80.muiName = 'SvgIcon';

export default BatteryCharging80;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionDashboard = (props) => (
  <SvgIcon {...props}>
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
  </SvgIcon>
);
ActionDashboard = pure(ActionDashboard);
ActionDashboard.displayName = 'ActionDashboard';
ActionDashboard.muiName = 'SvgIcon';

export default ActionDashboard;

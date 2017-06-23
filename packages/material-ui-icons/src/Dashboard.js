import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Dashboard = props =>
  <SvgIcon {...props}>
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </SvgIcon>;

Dashboard = pure(Dashboard);
Dashboard.muiName = 'SvgIcon';

export default Dashboard;

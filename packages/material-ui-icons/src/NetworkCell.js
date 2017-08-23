import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let NetworkCell = props =>
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M2 22h20V2z" /><path d="M17 7L2 22h15z" />
  </SvgIcon>;

NetworkCell = pure(NetworkCell);
NetworkCell.muiName = 'SvgIcon';

export default NetworkCell;

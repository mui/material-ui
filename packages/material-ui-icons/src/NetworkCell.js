import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let NetworkCell = props =>
  <SvgIconCustom {...props}>
    <path fillOpacity=".3" d="M2 22h20V2z" /><path d="M17 7L2 22h15z" />
  </SvgIconCustom>;

NetworkCell = pure(NetworkCell);
NetworkCell.muiName = 'SvgIcon';

export default NetworkCell;

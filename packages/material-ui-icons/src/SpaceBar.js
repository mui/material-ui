import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SpaceBar = props =>
  <SvgIcon {...props}>
    <path d="M18 9v4H6V9H4v6h16V9z" />
  </SvgIcon>;

SpaceBar = pure(SpaceBar);
SpaceBar.muiName = 'SvgIcon';

export default SpaceBar;

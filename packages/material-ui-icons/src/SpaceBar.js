import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let SpaceBar = props =>
  <SvgIconCustom {...props}>
    <path d="M18 9v4H6V9H4v6h16V9z" />
  </SvgIconCustom>;

SpaceBar = pure(SpaceBar);
SpaceBar.muiName = 'SvgIcon';

export default SpaceBar;

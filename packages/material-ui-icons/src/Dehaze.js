import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let Dehaze = props =>
  <SvgIconCustom {...props}>
    <path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z" />
  </SvgIconCustom>;

Dehaze = pure(Dehaze);
Dehaze.muiName = 'SvgIcon';

export default Dehaze;

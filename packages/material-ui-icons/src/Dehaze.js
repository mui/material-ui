import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Dehaze = props =>
  <SvgIcon {...props}>
    <path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z" />
  </SvgIcon>;

Dehaze = pure(Dehaze);
Dehaze.muiName = 'SvgIcon';

export default Dehaze;

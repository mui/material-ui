import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let Eject = props =>
  <SvgIconCustom {...props}>
    <path d="M5 17h14v2H5zm7-12L5.33 15h13.34z" />
  </SvgIconCustom>;

Eject = pure(Eject);
Eject.muiName = 'SvgIcon';

export default Eject;

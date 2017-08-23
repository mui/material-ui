import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Eject = props =>
  <SvgIcon {...props}>
    <path d="M5 17h14v2H5zm7-12L5.33 15h13.34z" />
  </SvgIcon>;

Eject = pure(Eject);
Eject.muiName = 'SvgIcon';

export default Eject;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let Brightness1 = props =>
  <SvgIconCustom {...props}>
    <circle cx="12" cy="12" r="10" />
  </SvgIconCustom>;

Brightness1 = pure(Brightness1);
Brightness1.muiName = 'SvgIcon';

export default Brightness1;

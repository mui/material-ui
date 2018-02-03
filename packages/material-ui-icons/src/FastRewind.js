import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let FastRewind = props =>
  <SvgIconCustom {...props}>
    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
  </SvgIconCustom>;

FastRewind = pure(FastRewind);
FastRewind.muiName = 'SvgIcon';

export default FastRewind;

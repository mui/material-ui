import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let SkipPrevious = props =>
  <SvgIconCustom {...props}>
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
  </SvgIconCustom>;

SkipPrevious = pure(SkipPrevious);
SkipPrevious.muiName = 'SvgIcon';

export default SkipPrevious;

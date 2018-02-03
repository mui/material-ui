import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let SkipNext = props =>
  <SvgIconCustom {...props}>
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
  </SvgIconCustom>;

SkipNext = pure(SkipNext);
SkipNext.muiName = 'SvgIcon';

export default SkipNext;

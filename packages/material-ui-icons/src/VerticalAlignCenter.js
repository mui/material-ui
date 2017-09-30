import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let VerticalAlignCenter = props =>
  <SvgIconCustom {...props}>
    <path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z" />
  </SvgIconCustom>;

VerticalAlignCenter = pure(VerticalAlignCenter);
VerticalAlignCenter.muiName = 'SvgIcon';

export default VerticalAlignCenter;

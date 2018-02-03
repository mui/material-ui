import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let Reorder = props =>
  <SvgIconCustom {...props}>
    <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z" />
  </SvgIconCustom>;

Reorder = pure(Reorder);
Reorder.muiName = 'SvgIcon';

export default Reorder;

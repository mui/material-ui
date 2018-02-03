import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let ViewCompact = props =>
  <SvgIconCustom {...props}>
    <path d="M3 19h6v-7H3v7zm7 0h12v-7H10v7zM3 5v6h19V5H3z" />
  </SvgIconCustom>;

ViewCompact = pure(ViewCompact);
ViewCompact.muiName = 'SvgIcon';

export default ViewCompact;

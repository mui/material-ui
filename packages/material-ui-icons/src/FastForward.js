import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let FastForward = props =>
  <SvgIconCustom {...props}>
    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
  </SvgIconCustom>;

FastForward = pure(FastForward);
FastForward.muiName = 'SvgIcon';

export default FastForward;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let Forward = props =>
  <SvgIconCustom {...props}>
    <path d="M12 8V4l8 8-8 8v-4H4V8z" />
  </SvgIconCustom>;

Forward = pure(Forward);
Forward.muiName = 'SvgIcon';

export default Forward;

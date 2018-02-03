import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let Title = props =>
  <SvgIconCustom {...props}>
    <path d="M5 4v3h5.5v12h3V7H19V4z" />
  </SvgIconCustom>;

Title = pure(Title);
Title.muiName = 'SvgIcon';

export default Title;

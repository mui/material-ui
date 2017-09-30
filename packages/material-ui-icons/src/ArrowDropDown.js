import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let ArrowDropDown = props =>
  <SvgIconCustom {...props}>
    <path d="M7 10l5 5 5-5z" />
  </SvgIconCustom>;

ArrowDropDown = pure(ArrowDropDown);
ArrowDropDown.muiName = 'SvgIcon';

export default ArrowDropDown;

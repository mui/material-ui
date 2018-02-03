import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let ArrowDropUp = props =>
  <SvgIconCustom {...props}>
    <path d="M7 14l5-5 5 5z" />
  </SvgIconCustom>;

ArrowDropUp = pure(ArrowDropUp);
ArrowDropUp.muiName = 'SvgIcon';

export default ArrowDropUp;

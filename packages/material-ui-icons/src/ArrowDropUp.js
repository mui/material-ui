import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let ArrowDropUp = props =>
  <SvgIcon {...props}>
    <path d="M7 14l5-5 5 5z" />
  </SvgIcon>;

ArrowDropUp = pure(ArrowDropUp);
ArrowDropUp.muiName = 'SvgIcon';

export default ArrowDropUp;

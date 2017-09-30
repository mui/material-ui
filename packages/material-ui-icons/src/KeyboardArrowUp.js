import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let KeyboardArrowUp = props =>
  <SvgIconCustom {...props}>
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
  </SvgIconCustom>;

KeyboardArrowUp = pure(KeyboardArrowUp);
KeyboardArrowUp.muiName = 'SvgIcon';

export default KeyboardArrowUp;

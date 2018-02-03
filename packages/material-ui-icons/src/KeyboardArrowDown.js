import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let KeyboardArrowDown = props =>
  <SvgIconCustom {...props}>
    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
  </SvgIconCustom>;

KeyboardArrowDown = pure(KeyboardArrowDown);
KeyboardArrowDown.muiName = 'SvgIcon';

export default KeyboardArrowDown;

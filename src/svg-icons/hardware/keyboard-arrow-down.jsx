import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let HardwareKeyboardArrowDown = (props) => (
  <SvgIcon {...props}>
    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
  </SvgIcon>
);
HardwareKeyboardArrowDown = pure(HardwareKeyboardArrowDown)
HardwareKeyboardArrowDown.displayName = 'HardwareKeyboardArrowDown';

export default HardwareKeyboardArrowDown;

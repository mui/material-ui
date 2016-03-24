import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let HardwareKeyboardArrowLeft = (props) => (
  <SvgIcon {...props}>
    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
  </SvgIcon>
);
HardwareKeyboardArrowLeft = pure(HardwareKeyboardArrowLeft);
HardwareKeyboardArrowLeft.displayName = 'HardwareKeyboardArrowLeft';

export default HardwareKeyboardArrowLeft;

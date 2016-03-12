import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let HardwareKeyboardCapslock = (props) => (
  <SvgIcon {...props}>
    <path d="M12 8.41L16.59 13 18 11.59l-6-6-6 6L7.41 13 12 8.41zM6 18h12v-2H6v2z"/>
  </SvgIcon>
);
HardwareKeyboardCapslock = pure(HardwareKeyboardCapslock)
HardwareKeyboardCapslock.displayName = 'HardwareKeyboardCapslock';

export default HardwareKeyboardCapslock;

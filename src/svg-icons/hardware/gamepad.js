import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let HardwareGamepad = (props) => (
  <SvgIcon {...props}>
    <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"/>
  </SvgIcon>
);
HardwareGamepad = pure(HardwareGamepad);
HardwareGamepad.displayName = 'HardwareGamepad';
HardwareGamepad.muiName = 'SvgIcon';

export default HardwareGamepad;

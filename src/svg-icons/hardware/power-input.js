import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let HardwarePowerInput = (props) => (
  <SvgIcon {...props}>
    <path d="M2 9v2h19V9H2zm0 6h5v-2H2v2zm7 0h5v-2H9v2zm7 0h5v-2h-5v2z"/>
  </SvgIcon>
);
HardwarePowerInput = pure(HardwarePowerInput);
HardwarePowerInput.displayName = 'HardwarePowerInput';

export default HardwarePowerInput;

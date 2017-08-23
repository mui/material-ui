import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Gamepad = props =>
  <SvgIcon {...props}>
    <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z" />
  </SvgIcon>;

Gamepad = pure(Gamepad);
Gamepad.muiName = 'SvgIcon';

export default Gamepad;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let DoNotDisturbOn = props =>
  <SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
  </SvgIcon>;

DoNotDisturbOn = pure(DoNotDisturbOn);
DoNotDisturbOn.muiName = 'SvgIcon';

export default DoNotDisturbOn;

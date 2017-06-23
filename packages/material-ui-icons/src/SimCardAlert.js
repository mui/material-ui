import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SimCardAlert = props =>
  <SvgIcon {...props}>
    <path d="M18 2h-8L4.02 8 4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 15h-2v-2h2v2zm0-4h-2V8h2v5z" />
  </SvgIcon>;

SimCardAlert = pure(SimCardAlert);
SimCardAlert.muiName = 'SvgIcon';

export default SimCardAlert;

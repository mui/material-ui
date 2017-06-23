import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Flight = props =>
  <SvgIcon {...props}>
    <path d="M10.18 9" /><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </SvgIcon>;

Flight = pure(Flight);
Flight.muiName = 'SvgIcon';

export default Flight;

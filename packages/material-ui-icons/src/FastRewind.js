import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FastRewind = props =>
  <SvgIcon {...props}>
    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
  </SvgIcon>;

FastRewind = pure(FastRewind);
FastRewind.muiName = 'SvgIcon';

export default FastRewind;

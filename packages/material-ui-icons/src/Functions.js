import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Functions = props =>
  <SvgIcon {...props}>
    <path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z" />
  </SvgIcon>;

Functions = pure(Functions);
Functions.muiName = 'SvgIcon';

export default Functions;

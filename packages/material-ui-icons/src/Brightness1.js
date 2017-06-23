import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Brightness1 = props =>
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="10" />
  </SvgIcon>;

Brightness1 = pure(Brightness1);
Brightness1.muiName = 'SvgIcon';

export default Brightness1;

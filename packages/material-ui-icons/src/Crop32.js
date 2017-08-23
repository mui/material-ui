import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Crop32 = props =>
  <SvgIcon {...props}>
    <path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V6h14v12z" />
  </SvgIcon>;

Crop32 = pure(Crop32);
Crop32.muiName = 'SvgIcon';

export default Crop32;

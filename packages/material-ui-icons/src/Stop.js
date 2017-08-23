import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Stop = props =>
  <SvgIcon {...props}>
    <path d="M6 6h12v12H6z" />
  </SvgIcon>;

Stop = pure(Stop);
Stop.muiName = 'SvgIcon';

export default Stop;

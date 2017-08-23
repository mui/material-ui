import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Power = props =>
  <SvgIcon {...props}>
    <path d="M16.01 7L16 3h-2v4h-4V3H8v4h-.01C7 6.99 6 7.99 6 8.99v5.49L9.5 18v3h5v-3l3.5-3.51v-5.5c0-1-1-2-1.99-1.99z" />
  </SvgIcon>;

Power = pure(Power);
Power.muiName = 'SvgIcon';

export default Power;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FlashOn = props =>
  <SvgIcon {...props}>
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </SvgIcon>;

FlashOn = pure(FlashOn);
FlashOn.muiName = 'SvgIcon';

export default FlashOn;

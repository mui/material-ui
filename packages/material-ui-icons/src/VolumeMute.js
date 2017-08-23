import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let VolumeMute = props =>
  <SvgIcon {...props}>
    <path d="M7 9v6h4l5 5V4l-5 5H7z" />
  </SvgIcon>;

VolumeMute = pure(VolumeMute);
VolumeMute.muiName = 'SvgIcon';

export default VolumeMute;

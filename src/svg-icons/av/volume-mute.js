import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let AvVolumeMute = (props) => (
  <SvgIcon {...props}>
    <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
  </SvgIcon>
);
AvVolumeMute = pure(AvVolumeMute);
AvVolumeMute.displayName = 'AvVolumeMute';
AvVolumeMute.muiName = 'SvgIcon';

export default AvVolumeMute;

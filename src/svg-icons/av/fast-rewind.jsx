import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let AvFastRewind = (props) => (
  <SvgIcon {...props}>
    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
  </SvgIcon>
);
AvFastRewind = pure(AvFastRewind)
AvFastRewind.displayName = 'AvFastRewind';

export default AvFastRewind;

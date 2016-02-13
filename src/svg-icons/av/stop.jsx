import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let AvStop = (props) => (
  <SvgIcon {...props}>
    <path d="M6 6h12v12H6z"/>
  </SvgIcon>
);
AvStop = pure(AvStop)
AvStop.displayName = 'AvStop';

export default AvStop;

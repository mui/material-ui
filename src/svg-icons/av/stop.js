import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let AvStop = (props) => (
  <SvgIcon {...props}>
    <path d="M6 6h12v12H6z"/>
  </SvgIcon>
);
AvStop = pure(AvStop);
AvStop.displayName = 'AvStop';
AvStop.muiName = 'SvgIcon';

export default AvStop;

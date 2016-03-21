import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let AvPause = (props) => (
  <SvgIcon {...props}>
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </SvgIcon>
);
AvPause = pure(AvPause);
AvPause.displayName = 'AvPause';

export default AvPause;

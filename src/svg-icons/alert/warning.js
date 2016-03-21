import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let AlertWarning = (props) => (
  <SvgIcon {...props}>
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </SvgIcon>
);
AlertWarning = pure(AlertWarning);
AlertWarning.displayName = 'AlertWarning';

export default AlertWarning;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionCameraEnhance = (props) => (
  <SvgIcon {...props}>
    <path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"/>
  </SvgIcon>
);
ActionCameraEnhance = pure(ActionCameraEnhance);
ActionCameraEnhance.displayName = 'ActionCameraEnhance';
ActionCameraEnhance.muiName = 'SvgIcon';

export default ActionCameraEnhance;

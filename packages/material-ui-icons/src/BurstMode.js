import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let BurstMode = props =>
  <SvgIcon {...props}>
    <path d="M1 5h2v14H1zm4 0h2v14H5zm17 0H10c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zM11 17l2.5-3.15L15.29 16l2.5-3.22L21 17H11z" />
  </SvgIcon>;

BurstMode = pure(BurstMode);
BurstMode.muiName = 'SvgIcon';

export default BurstMode;

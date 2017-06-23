import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let LocalBar = props =>
  <SvgIcon {...props}>
    <path d="M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z" />
  </SvgIcon>;

LocalBar = pure(LocalBar);
LocalBar.muiName = 'SvgIcon';

export default LocalBar;

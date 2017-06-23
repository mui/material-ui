import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let PlayArrow = props =>
  <SvgIcon {...props}>
    <path d="M8 5v14l11-7z" />
  </SvgIcon>;

PlayArrow = pure(PlayArrow);
PlayArrow.muiName = 'SvgIcon';

export default PlayArrow;

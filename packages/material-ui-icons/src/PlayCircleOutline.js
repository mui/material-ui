import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let PlayCircleOutline = props =>
  <SvgIcon {...props}>
    <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </SvgIcon>;

PlayCircleOutline = pure(PlayCircleOutline);
PlayCircleOutline.muiName = 'SvgIcon';

export default PlayCircleOutline;

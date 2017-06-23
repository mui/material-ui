import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let QueueMusic = props =>
  <SvgIcon {...props}>
    <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
  </SvgIcon>;

QueueMusic = pure(QueueMusic);
QueueMusic.muiName = 'SvgIcon';

export default QueueMusic;

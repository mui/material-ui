import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Videocam = props =>
  <SvgIcon {...props}>
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
  </SvgIcon>;

Videocam = pure(Videocam);
Videocam.muiName = 'SvgIcon';

export default Videocam;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let PlaylistAddCheck = props =>
  <SvgIcon {...props}>
    <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z" />
  </SvgIcon>;

PlaylistAddCheck = pure(PlaylistAddCheck);
PlaylistAddCheck.muiName = 'SvgIcon';

export default PlaylistAddCheck;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let PlaylistAdd = props =>
  <SvgIcon {...props}>
    <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z" />
  </SvgIcon>;

PlaylistAdd = pure(PlaylistAdd);
PlaylistAdd.muiName = 'SvgIcon';

export default PlaylistAdd;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let PlaylistPlay = props =>
  <SvgIcon {...props}>
    <path d="M19 9H2v2h17V9zm0-4H2v2h17V5zM2 15h13v-2H2v2zm15-2v6l5-3-5-3z" />
  </SvgIcon>;

PlaylistPlay = pure(PlaylistPlay);
PlaylistPlay.muiName = 'SvgIcon';

export default PlaylistPlay;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let PlayArrow = props =>
  <SvgIconCustom {...props}>
    <path d="M8 5v14l11-7z" />
  </SvgIconCustom>;

PlayArrow = pure(PlayArrow);
PlayArrow.muiName = 'SvgIcon';

export default PlayArrow;

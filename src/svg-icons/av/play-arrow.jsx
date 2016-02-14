import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let AvPlayArrow = (props) => (
  <SvgIcon {...props}>
    <path d="M8 5v14l11-7z"/>
  </SvgIcon>
);
AvPlayArrow = pure(AvPlayArrow)
AvPlayArrow.displayName = 'AvPlayArrow';

export default AvPlayArrow;

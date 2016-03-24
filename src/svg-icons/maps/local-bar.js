import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let MapsLocalBar = (props) => (
  <SvgIcon {...props}>
    <path d="M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z"/>
  </SvgIcon>
);
MapsLocalBar = pure(MapsLocalBar);
MapsLocalBar.displayName = 'MapsLocalBar';

export default MapsLocalBar;

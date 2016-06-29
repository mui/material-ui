import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageDehaze = (props) => (
  <SvgIcon {...props}>
    <path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z"/>
  </SvgIcon>
);
ImageDehaze = pure(ImageDehaze);
ImageDehaze.displayName = 'ImageDehaze';
ImageDehaze.muiName = 'SvgIcon';

export default ImageDehaze;

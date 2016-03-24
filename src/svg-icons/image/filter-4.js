import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageFilter4 = (props) => (
  <SvgIcon {...props}>
    <path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm12 10h2V5h-2v4h-2V5h-2v6h4v4zm6-14H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"/>
  </SvgIcon>
);
ImageFilter4 = pure(ImageFilter4);
ImageFilter4.displayName = 'ImageFilter4';

export default ImageFilter4;

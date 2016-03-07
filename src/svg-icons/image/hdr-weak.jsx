import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ImageHdrWeak = (props) => (
  <SvgIcon {...props}>
    <path d="M5 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm12-2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
  </SvgIcon>
);
ImageHdrWeak = pure(ImageHdrWeak)
ImageHdrWeak.displayName = 'ImageHdrWeak';

export default ImageHdrWeak;

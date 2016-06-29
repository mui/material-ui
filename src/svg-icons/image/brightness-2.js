import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageBrightness2 = (props) => (
  <SvgIcon {...props}>
    <path d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z"/>
  </SvgIcon>
);
ImageBrightness2 = pure(ImageBrightness2);
ImageBrightness2.displayName = 'ImageBrightness2';
ImageBrightness2.muiName = 'SvgIcon';

export default ImageBrightness2;

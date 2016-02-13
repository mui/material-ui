import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ImageCrop169 = (props) => (
  <SvgIcon {...props}>
    <path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"/>
  </SvgIcon>
);
ImageCrop169 = pure(ImageCrop169)
ImageCrop169.displayName = 'ImageCrop169';

export default ImageCrop169;

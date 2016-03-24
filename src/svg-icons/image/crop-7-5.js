import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageCrop75 = (props) => (
  <SvgIcon {...props}>
    <path d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"/>
  </SvgIcon>
);
ImageCrop75 = pure(ImageCrop75);
ImageCrop75.displayName = 'ImageCrop75';

export default ImageCrop75;

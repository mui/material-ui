import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageCropDin = (props) => (
  <SvgIcon {...props}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
  </SvgIcon>
);
ImageCropDin = pure(ImageCropDin);
ImageCropDin.displayName = 'ImageCropDin';
ImageCropDin.muiName = 'SvgIcon';

export default ImageCropDin;

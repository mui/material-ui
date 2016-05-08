import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageFlashOn = (props) => (
  <SvgIcon {...props}>
    <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
  </SvgIcon>
);
ImageFlashOn = pure(ImageFlashOn);
ImageFlashOn.displayName = 'ImageFlashOn';
ImageFlashOn.muiName = 'SvgIcon';

export default ImageFlashOn;

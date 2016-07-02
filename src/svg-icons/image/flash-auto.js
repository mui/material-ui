import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageFlashAuto = (props) => (
  <SvgIcon {...props}>
    <path d="M3 2v12h3v9l7-12H9l4-9H3zm16 0h-2l-3.2 9h1.9l.7-2h3.2l.7 2h1.9L19 2zm-2.15 5.65L18 4l1.15 3.65h-2.3z"/>
  </SvgIcon>
);
ImageFlashAuto = pure(ImageFlashAuto);
ImageFlashAuto.displayName = 'ImageFlashAuto';
ImageFlashAuto.muiName = 'SvgIcon';

export default ImageFlashAuto;

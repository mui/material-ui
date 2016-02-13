import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ImageFilterHdr = (props) => (
  <SvgIcon {...props}>
    <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
  </SvgIcon>
);
ImageFilterHdr = pure(ImageFilterHdr)
ImageFilterHdr.displayName = 'ImageFilterHdr';

export default ImageFilterHdr;

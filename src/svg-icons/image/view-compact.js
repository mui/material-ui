import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageViewCompact = (props) => (
  <SvgIcon {...props}>
    <path d="M3 19h6v-7H3v7zm7 0h12v-7H10v7zM3 5v6h19V5H3z"/>
  </SvgIcon>
);
ImageViewCompact = pure(ImageViewCompact);
ImageViewCompact.displayName = 'ImageViewCompact';
ImageViewCompact.muiName = 'SvgIcon';

export default ImageViewCompact;

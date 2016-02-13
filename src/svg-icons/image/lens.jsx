import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ImageLens = (props) => (
  <SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
  </SvgIcon>
);
ImageLens = pure(ImageLens)
ImageLens.displayName = 'ImageLens';

export default ImageLens;

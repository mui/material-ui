import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ImageLooksOne = (props) => (
  <SvgIcon {...props}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z"/>
  </SvgIcon>
);
ImageLooksOne = pure(ImageLooksOne)
ImageLooksOne.displayName = 'ImageLooksOne';

export default ImageLooksOne;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let PhotoSizeSelectActual = props =>
  <SvgIcon {...props}>
    <path d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z" />
  </SvgIcon>;

PhotoSizeSelectActual = pure(PhotoSizeSelectActual);
PhotoSizeSelectActual.muiName = 'SvgIcon';

export default PhotoSizeSelectActual;

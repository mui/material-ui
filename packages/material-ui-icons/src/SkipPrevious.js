import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SkipPrevious = props =>
  <SvgIcon {...props}>
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
  </SvgIcon>;

SkipPrevious = pure(SkipPrevious);
SkipPrevious.muiName = 'SvgIcon';

export default SkipPrevious;

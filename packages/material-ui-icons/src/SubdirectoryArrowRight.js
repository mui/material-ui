import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SubdirectoryArrowRight = props =>
  <SvgIcon {...props}>
    <path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z" />
  </SvgIcon>;

SubdirectoryArrowRight = pure(SubdirectoryArrowRight);
SubdirectoryArrowRight.muiName = 'SvgIcon';

export default SubdirectoryArrowRight;

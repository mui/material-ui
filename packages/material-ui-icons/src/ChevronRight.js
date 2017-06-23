import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let ChevronRight = props =>
  <SvgIcon {...props}>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </SvgIcon>;

ChevronRight = pure(ChevronRight);
ChevronRight.muiName = 'SvgIcon';

export default ChevronRight;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let AvSkipPrevious = (props) => (
  <SvgIcon {...props}>
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
  </SvgIcon>
);
AvSkipPrevious = pure(AvSkipPrevious);
AvSkipPrevious.displayName = 'AvSkipPrevious';
AvSkipPrevious.muiName = 'SvgIcon';

export default AvSkipPrevious;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Done = props =>
  <SvgIcon {...props}>
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </SvgIcon>;

Done = pure(Done);
Done.muiName = 'SvgIcon';

export default Done;

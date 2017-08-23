import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Check = props =>
  <SvgIcon {...props}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </SvgIcon>;

Check = pure(Check);
Check.muiName = 'SvgIcon';

export default Check;

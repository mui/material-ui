import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let ViewStream = props =>
  <SvgIcon {...props}>
    <path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z" />
  </SvgIcon>;

ViewStream = pure(ViewStream);
ViewStream.muiName = 'SvgIcon';

export default ViewStream;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Forward = props =>
  <SvgIcon {...props}>
    <path d="M12 8V4l8 8-8 8v-4H4V8z" />
  </SvgIcon>;

Forward = pure(Forward);
Forward.muiName = 'SvgIcon';

export default Forward;

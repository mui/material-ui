import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Publish = props =>
  <SvgIcon {...props}>
    <path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z" />
  </SvgIcon>;

Publish = pure(Publish);
Publish.muiName = 'SvgIcon';

export default Publish;

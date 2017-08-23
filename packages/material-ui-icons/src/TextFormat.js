import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let TextFormat = props =>
  <SvgIcon {...props}>
    <path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z" />
  </SvgIcon>;

TextFormat = pure(TextFormat);
TextFormat.muiName = 'SvgIcon';

export default TextFormat;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FormatItalic = props =>
  <SvgIcon {...props}>
    <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
  </SvgIcon>;

FormatItalic = pure(FormatItalic);
FormatItalic.muiName = 'SvgIcon';

export default FormatItalic;

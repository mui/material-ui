import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FormatAlignJustify = props =>
  <SvgIcon {...props}>
    <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z" />
  </SvgIcon>;

FormatAlignJustify = pure(FormatAlignJustify);
FormatAlignJustify.muiName = 'SvgIcon';

export default FormatAlignJustify;

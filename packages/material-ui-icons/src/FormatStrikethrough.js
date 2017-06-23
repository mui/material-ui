import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FormatStrikethrough = props =>
  <SvgIcon {...props}>
    <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" />
  </SvgIcon>;

FormatStrikethrough = pure(FormatStrikethrough);
FormatStrikethrough.muiName = 'SvgIcon';

export default FormatStrikethrough;

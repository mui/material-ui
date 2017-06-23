import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let QueuePlayNext = props =>
  <SvgIcon {...props}>
    <path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h2v-2H3V5h18v8h2V5c0-1.11-.9-2-2-2zm-8 7V7h-2v3H8v2h3v3h2v-3h3v-2h-3zm11 8l-4.5 4.5L18 21l3-3-3-3 1.5-1.5L24 18z" />
  </SvgIcon>;

QueuePlayNext = pure(QueuePlayNext);
QueuePlayNext.muiName = 'SvgIcon';

export default QueuePlayNext;

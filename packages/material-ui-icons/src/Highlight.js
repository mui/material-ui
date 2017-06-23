import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Highlight = props =>
  <SvgIcon {...props}>
    <path d="M6 14l3 3v5h6v-5l3-3V9H6zm5-12h2v3h-2zM3.5 5.875L4.914 4.46l2.12 2.122L5.62 7.997zm13.46.71l2.123-2.12 1.414 1.414L18.375 8z" />
  </SvgIcon>;

Highlight = pure(Highlight);
Highlight.muiName = 'SvgIcon';

export default Highlight;

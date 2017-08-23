import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Toc = props =>
  <SvgIcon {...props}>
    <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z" />
  </SvgIcon>;

Toc = pure(Toc);
Toc.muiName = 'SvgIcon';

export default Toc;

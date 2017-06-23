import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let BorderStyle = props =>
  <SvgIcon {...props}>
    <path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z" />
  </SvgIcon>;

BorderStyle = pure(BorderStyle);
BorderStyle.muiName = 'SvgIcon';

export default BorderStyle;

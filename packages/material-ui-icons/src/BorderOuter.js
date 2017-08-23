import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let BorderOuter = props =>
  <SvgIcon {...props}>
    <path d="M13 7h-2v2h2V7zm0 4h-2v2h2v-2zm4 0h-2v2h2v-2zM3 3v18h18V3H3zm16 16H5V5h14v14zm-6-4h-2v2h2v-2zm-4-4H7v2h2v-2z" />
  </SvgIcon>;

BorderOuter = pure(BorderOuter);
BorderOuter.muiName = 'SvgIcon';

export default BorderOuter;

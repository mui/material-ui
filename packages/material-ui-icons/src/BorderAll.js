import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let BorderAll = props =>
  <SvgIcon {...props}>
    <path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z" />
  </SvgIcon>;

BorderAll = pure(BorderAll);
BorderAll.muiName = 'SvgIcon';

export default BorderAll;

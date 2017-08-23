import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let PictureInPictureAlt = props =>
  <SvgIcon {...props}>
    <path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z" />
  </SvgIcon>;

PictureInPictureAlt = pure(PictureInPictureAlt);
PictureInPictureAlt.muiName = 'SvgIcon';

export default PictureInPictureAlt;

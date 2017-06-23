import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Pause = props =>
  <SvgIcon {...props}>
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </SvgIcon>;

Pause = pure(Pause);
Pause.muiName = 'SvgIcon';

export default Pause;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Dock = props =>
  <SvgIcon {...props}>
    <path d="M8 23h8v-2H8v2zm8-21.99L8 1c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM16 15H8V5h8v10z" />
  </SvgIcon>;

Dock = pure(Dock);
Dock.muiName = 'SvgIcon';

export default Dock;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let DragHandle = props =>
  <SvgIcon {...props}>
    <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
  </SvgIcon>;

DragHandle = pure(DragHandle);
DragHandle.muiName = 'SvgIcon';

export default DragHandle;

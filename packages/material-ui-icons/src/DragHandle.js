import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let DragHandle = props =>
  <SvgIconCustom {...props}>
    <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
  </SvgIconCustom>;

DragHandle = pure(DragHandle);
DragHandle.muiName = 'SvgIcon';

export default DragHandle;

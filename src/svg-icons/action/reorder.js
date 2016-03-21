import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionReorder = (props) => (
  <SvgIcon {...props}>
    <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/>
  </SvgIcon>
);
ActionReorder = pure(ActionReorder);
ActionReorder.displayName = 'ActionReorder';

export default ActionReorder;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionList = (props) => (
  <SvgIcon {...props}>
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
  </SvgIcon>
);
ActionList = pure(ActionList);
ActionList.displayName = 'ActionList';

export default ActionList;

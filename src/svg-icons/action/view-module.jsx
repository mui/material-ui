import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ActionViewModule = (props) => (
  <SvgIcon {...props}>
    <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/>
  </SvgIcon>
);
ActionViewModule = pure(ActionViewModule)
ActionViewModule.displayName = 'ActionViewModule';

export default ActionViewModule;

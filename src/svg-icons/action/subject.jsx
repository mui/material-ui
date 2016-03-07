import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ActionSubject = (props) => (
  <SvgIcon {...props}>
    <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/>
  </SvgIcon>
);
ActionSubject = pure(ActionSubject)
ActionSubject.displayName = 'ActionSubject';

export default ActionSubject;

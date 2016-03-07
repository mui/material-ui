import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let EditorDragHandle = (props) => (
  <SvgIcon {...props}>
    <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/>
  </SvgIcon>
);
EditorDragHandle = pure(EditorDragHandle)
EditorDragHandle.displayName = 'EditorDragHandle';

export default EditorDragHandle;

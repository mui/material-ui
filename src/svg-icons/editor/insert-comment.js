import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let EditorInsertComment = (props) => (
  <SvgIcon {...props}>
    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
  </SvgIcon>
);
EditorInsertComment = pure(EditorInsertComment);
EditorInsertComment.displayName = 'EditorInsertComment';
EditorInsertComment.muiName = 'SvgIcon';

export default EditorInsertComment;

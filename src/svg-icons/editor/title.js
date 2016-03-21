import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let EditorTitle = (props) => (
  <SvgIcon {...props}>
    <path d="M5 4v3h5.5v12h3V7H19V4z"/>
  </SvgIcon>
);
EditorTitle = pure(EditorTitle);
EditorTitle.displayName = 'EditorTitle';

export default EditorTitle;

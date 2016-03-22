import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let EditorPublish = (props) => (
  <SvgIcon {...props}>
    <path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"/>
  </SvgIcon>
);
EditorPublish = pure(EditorPublish);
EditorPublish.displayName = 'EditorPublish';

export default EditorPublish;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let EditorShortText = (props) => (
  <SvgIcon {...props}>
    <path d="M4 9h16v2H4zm0 4h10v2H4z"/>
  </SvgIcon>
);
EditorShortText = pure(EditorShortText);
EditorShortText.displayName = 'EditorShortText';
EditorShortText.muiName = 'SvgIcon';

export default EditorShortText;

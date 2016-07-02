import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let EditorVerticalAlignBottom = (props) => (
  <SvgIcon {...props}>
    <path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"/>
  </SvgIcon>
);
EditorVerticalAlignBottom = pure(EditorVerticalAlignBottom);
EditorVerticalAlignBottom.displayName = 'EditorVerticalAlignBottom';
EditorVerticalAlignBottom.muiName = 'SvgIcon';

export default EditorVerticalAlignBottom;

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let EditorVerticalAlignTop = (props) => (
  <SvgIcon {...props}>
    <path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"/>
  </SvgIcon>
);
EditorVerticalAlignTop = pure(EditorVerticalAlignTop);
EditorVerticalAlignTop.displayName = 'EditorVerticalAlignTop';
EditorVerticalAlignTop.muiName = 'SvgIcon';

export default EditorVerticalAlignTop;

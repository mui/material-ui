import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let EditorFormatAlignJustify = (props) => (
  <SvgIcon {...props}>
    <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"/>
  </SvgIcon>
);
EditorFormatAlignJustify = pure(EditorFormatAlignJustify);
EditorFormatAlignJustify.displayName = 'EditorFormatAlignJustify';
EditorFormatAlignJustify.muiName = 'SvgIcon';

export default EditorFormatAlignJustify;

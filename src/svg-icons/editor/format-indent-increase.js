import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let EditorFormatIndentIncrease = (props) => (
  <SvgIcon {...props}>
    <path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/>
  </SvgIcon>
);
EditorFormatIndentIncrease = pure(EditorFormatIndentIncrease);
EditorFormatIndentIncrease.displayName = 'EditorFormatIndentIncrease';
EditorFormatIndentIncrease.muiName = 'SvgIcon';

export default EditorFormatIndentIncrease;

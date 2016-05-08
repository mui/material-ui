import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let EditorFormatSize = (props) => (
  <SvgIcon {...props}>
    <path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/>
  </SvgIcon>
);
EditorFormatSize = pure(EditorFormatSize);
EditorFormatSize.displayName = 'EditorFormatSize';
EditorFormatSize.muiName = 'SvgIcon';

export default EditorFormatSize;

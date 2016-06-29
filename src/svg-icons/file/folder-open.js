import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let FileFolderOpen = (props) => (
  <SvgIcon {...props}>
    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
  </SvgIcon>
);
FileFolderOpen = pure(FileFolderOpen);
FileFolderOpen.displayName = 'FileFolderOpen';
FileFolderOpen.muiName = 'SvgIcon';

export default FileFolderOpen;

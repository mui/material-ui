import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let FileFileDownload = (props) => (
  <SvgIcon {...props}>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </SvgIcon>
);
FileFileDownload = pure(FileFileDownload);
FileFileDownload.displayName = 'FileFileDownload';

export default FileFileDownload;

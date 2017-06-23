import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let InsertDriveFile = props =>
  <SvgIcon {...props}>
    <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z" />
  </SvgIcon>;

InsertDriveFile = pure(InsertDriveFile);
InsertDriveFile.muiName = 'SvgIcon';

export default InsertDriveFile;

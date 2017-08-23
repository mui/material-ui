import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FileUpload = props =>
  <SvgIcon {...props}>
    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
  </SvgIcon>;

FileUpload = pure(FileUpload);
FileUpload.muiName = 'SvgIcon';

export default FileUpload;

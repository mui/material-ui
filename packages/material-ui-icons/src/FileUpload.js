import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let FileUpload = props =>
  <SvgIconCustom {...props}>
    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
  </SvgIconCustom>;

FileUpload = pure(FileUpload);
FileUpload.muiName = 'SvgIcon';

export default FileUpload;

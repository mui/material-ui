import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let CreateNewFolder = props =>
  <SvgIcon {...props}>
    <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z" />
  </SvgIcon>;

CreateNewFolder = pure(CreateNewFolder);
CreateNewFolder.muiName = 'SvgIcon';

export default CreateNewFolder;

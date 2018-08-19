import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function FileDownload(props) {
  return (
    <SvgIcon {...props}>
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </SvgIcon>
  );
}

FileDownload.muiName = 'SvgIcon';

export default FileDownload;

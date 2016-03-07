import React from 'react';
import Badge from 'material-ui/lib/badge';
import IconButton from 'material-ui/lib/icon-button';
import UploadIcon from 'material-ui/lib/svg-icons/file/cloud-upload';
import FolderIcon from 'material-ui/lib/svg-icons/file/folder-open';

const BadgeExampleContent = () => (
  <div>
    <Badge
      badgeContent={<IconButton tooltip="Backup"><UploadIcon /></IconButton>}
    >
      <FolderIcon />
    </Badge>
    <Badge
      badgeContent="&copy;"
      badgeStyle={{fontSize: 20}}
    >
      Company Name
    </Badge>
  </div>
);

export default BadgeExampleContent;

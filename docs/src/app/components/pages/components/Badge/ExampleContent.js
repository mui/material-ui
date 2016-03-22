import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';
import FolderIcon from 'material-ui/svg-icons/file/folder-open';

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

import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

export default function BadgeAvatars() {
  return (
    <Badge
      overlap="circle"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={1}
      color="error"
    >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </Badge>
  );
}

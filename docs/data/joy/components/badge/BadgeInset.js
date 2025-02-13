import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';

export default function BadgeInset() {
  return (
    <Badge badgeInset="14%" color="danger">
      <Avatar src="/static/images/avatar/1.jpg" />
    </Badge>
  );
}

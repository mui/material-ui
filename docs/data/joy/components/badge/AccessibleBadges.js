import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Badge from '@mui/joy/Badge';
import MailIcon from '@mui/icons-material/Mail';

function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

export default function AccessibleBadges() {
  return (
    <IconButton color="neutral" aria-label={notificationsLabel(100)}>
      <Badge badgeContent={100} badgeInset="-20%">
        <MailIcon />
      </Badge>
    </IconButton>
  );
}

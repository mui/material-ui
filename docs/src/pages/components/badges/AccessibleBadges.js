import React from 'react';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

export default function SimpleBadge() {
  const notificationsCount = 998;
  function notificationsLabel(count) {
    if (count === 0) {
      return 'notifications';
    }
    if (count > 99) {
      return '99 plus notifications';
    }
    return `${count} notifications`;
  }

  return (
    <Box
      sx={{
        '& > *': {
          margin: 2,
        },
      }}
    >
      <a aria-label={notificationsLabel(notificationsCount)} href="/notifications">
        <Badge
          aria-labelledby="badge"
          aria-describedby="notificationCount"
          badgeContent={notificationsCount}
          color="primary"
        >
          <MailIcon style={{ color: 'black' }} titleAccess="notifications" />
        </Badge>
      </a>
    </Box>
  );
}

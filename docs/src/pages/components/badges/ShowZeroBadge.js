import * as React from 'react';
import Stack from '@material-ui/core/Stack';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

export default function ShowZeroBadge() {
  return (
    <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
      <Badge color="secondary" badgeContent={0}>
        <MailIcon />
      </Badge>
      <Badge color="secondary" badgeContent={0} showZero>
        <MailIcon />
      </Badge>
    </Stack>
  );
}

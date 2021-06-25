import * as React from 'react';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

export default function DotBadge() {
  return (
    <Box sx={{ color: 'action.active' }}>
      <Badge color="secondary" variant="dot">
        <MailIcon />
      </Badge>
    </Box>
  );
}

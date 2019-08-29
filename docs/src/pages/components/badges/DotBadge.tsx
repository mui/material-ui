import React from 'react';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';

export default function DotBadge() {
  return (
    <Box display="flex">
      <Box m={2}>
        <Badge color="primary" variant="dot">
          <MailIcon />
        </Badge>
      </Box>
      <Box m={2}>
        <Badge color="secondary" variant="dot">
          <MailIcon />
        </Badge>
      </Box>
      <Box m={2}>
        <Badge color="error" variant="dot">
          <Typography>Typography</Typography>
        </Badge>
      </Box>
    </Box>
  );
}

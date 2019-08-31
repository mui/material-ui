import React from 'react';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

export default function BadgeMax() {
  return (
    <Box display="flex">
      <Box m={2}>
        <Badge badgeContent={99} color="primary">
          <MailIcon />
        </Badge>
      </Box>
      <Box m={2}>
        <Badge badgeContent={100} color="primary">
          <MailIcon />
        </Badge>
      </Box>
      <Box m={2}>
        <Badge badgeContent={1000} max={999} color="primary">
          <MailIcon />
        </Badge>
      </Box>
    </Box>
  );
}

import * as React from 'react';
import Box from '@mui/joy/Box';
import Badge from '@mui/joy/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function BadgeMax() {
  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Badge badgeContent={99}>
        <MailIcon />
      </Badge>
      <Badge badgeContent={100} badgeInset="0 -6px 0 0">
        <MailIcon />
      </Badge>
      <Badge badgeContent={1000} max={999} badgeInset="0 -12px 0 0">
        <MailIcon />
      </Badge>
    </Box>
  );
}

import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export default function AccessibleBadge() {
  const count = 4;
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <Badge 
        badgeContent={count} 
        color="error"
      >
        {/* 🔑 Crucial accessibility addition: aria-label on the wrapped element */}
        <IconButton 
          color="inherit" 
          aria-label={`Show ${count} unread mail messages`} 
          title={`New Mail: ${count}`} 
        >
          <MailIcon />
        </IconButton>
      </Badge>

      <Badge 
        variant="dot" 
        color="success"
        overlap="circular"
      >
        {/* For a dot, indicate status */}
        <IconButton color="inherit" aria-label="User status: Online">
          [User Avatar] 
        </IconButton>
      </Badge>
    </Stack>
  );
}

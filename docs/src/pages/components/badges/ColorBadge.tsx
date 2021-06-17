import * as React from 'react';
import Badge from '@material-ui/core/Badge';
import Stack from '@material-ui/core/Stack';
import MailIcon from '@material-ui/icons/Mail';

export default function ColorBadge() {
  return (
    <Stack spacing={2} direction="row">
      {(
        ['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const
      ).map((color) => (
        <Badge badgeContent={4} color={color}>
          <MailIcon color="action" />
        </Badge>
      ))}
    </Stack>
  );
}

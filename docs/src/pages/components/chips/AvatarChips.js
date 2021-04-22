import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';

export default function AvatarChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
      <Chip
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Avatar"
        variant="outlined"
      />
    </Stack>
  );
}

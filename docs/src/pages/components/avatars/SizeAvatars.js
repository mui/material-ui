import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Stack from '@material-ui/core/Stack';

export default function ImageAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 24, height: 24 }}
      />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
      />
    </Stack>
  );
}

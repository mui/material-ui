import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Stack from '@material-ui/core/Stack';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

export default function LetterAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar>H</Avatar>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
      <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
    </Stack>
  );
}

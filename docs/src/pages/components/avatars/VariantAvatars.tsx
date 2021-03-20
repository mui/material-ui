import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Stack from '@material-ui/core/Stack';
import { deepOrange, green } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default function VariantAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
        N
      </Avatar>
      <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
        <AssignmentIcon />
      </Avatar>
    </Stack>
  );
}

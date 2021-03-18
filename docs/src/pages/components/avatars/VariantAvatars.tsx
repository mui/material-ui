import * as React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, green } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default function VariantAvatars() {
  return (
    <Box
      sx={{
        display: 'flex',
        // TODO Replace with Stack
        '& > :not(style) + :not(style)': { ml: 2 },
      }}
    >
      <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
        N
      </Avatar>
      <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
        <AssignmentIcon />
      </Avatar>
    </Box>
  );
}

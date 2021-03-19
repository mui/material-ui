import * as React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

export default function FallbackAvatars() {
  return (
    <Box
      sx={{
        display: 'flex',
        // TODO Replace with Stack
        '& > :not(style) + :not(style)': { ml: 2 },
      }}
    >
      <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
      >
        B
      </Avatar>
      <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
      />
      <Avatar src="/broken-image.jpg" />
    </Box>
  );
}

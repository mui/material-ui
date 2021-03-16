import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

export default function ImageAvatars() {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
    </Box>
  );
}

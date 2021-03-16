import * as React from 'react';
import { experimentalStyled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

const LargeAvatar = experimentalStyled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
}));

const SmallAvatar = experimentalStyled(Avatar)(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
}));

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
      <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <LargeAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </Box>
  );
}

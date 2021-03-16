import * as React from 'react';
import { deepOrange } from '@material-ui/core/colors';
import { experimentalStyled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

const OrangeAvatar = experimentalStyled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(deepOrange[500]),
  backgroundColor: deepOrange[500],
}));

export default function FallbackAvatars() {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
      <OrangeAvatar alt="Remy Sharp" src="/broken-image.jpg">
        B
      </OrangeAvatar>
      <OrangeAvatar alt="Remy Sharp" src="/broken-image.jpg" />
      <Avatar src="/broken-image.jpg" />
    </Box>
  );
}

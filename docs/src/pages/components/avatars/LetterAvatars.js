import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { experimentalStyled } from '@material-ui/core/styles';

const OrangeAvatar = experimentalStyled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(deepOrange[500]),
  backgroundColor: deepOrange[500],
}));

const PurpleAvatar = experimentalStyled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: deepPurple[500],
}));

export default function LetterAvatars() {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
      <Avatar>H</Avatar>
      <OrangeAvatar>N</OrangeAvatar>
      <PurpleAvatar>OP</PurpleAvatar>
    </Box>
  );
}

import * as React from 'react';
import { green, pink } from '@material-ui/core/colors';
import { experimentalStyled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import FolderIcon from '@material-ui/icons/Folder';
import PageviewIcon from '@material-ui/icons/Pageview';
import AssignmentIcon from '@material-ui/icons/Assignment';

const GreenAvatar = experimentalStyled(Avatar)({
  color: '#fff',
  backgroundColor: green[500],
});

const PinkAvatar = experimentalStyled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: pink[500],
}));

export default function IconAvatars() {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
      <Avatar>
        <FolderIcon />
      </Avatar>
      <PinkAvatar>
        <PageviewIcon />
      </PinkAvatar>
      <GreenAvatar>
        <AssignmentIcon />
      </GreenAvatar>
    </Box>
  );
}

import * as React from 'react';
import { green, pink } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import PageviewIcon from '@material-ui/icons/Pageview';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default function IconAvatars() {
  return (
    <Box
      sx={{
        display: 'flex',
        // TODO Replace with Stack
        '& > :not(style) + :not(style)': { ml: 2 },
      }}
    >
      <Avatar>
        <FolderIcon />
      </Avatar>
      <Avatar sx={{ bgcolor: pink[500] }}>
        <PageviewIcon />
      </Avatar>
      <Avatar sx={{ bgcolor: green[500] }}>
        <AssignmentIcon />
      </Avatar>
    </Box>
  );
}

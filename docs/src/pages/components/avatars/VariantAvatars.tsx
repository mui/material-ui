import * as React from 'react';
import { deepOrange, green } from '@material-ui/core/colors';
import { experimentalStyled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import AssignmentIcon from '@material-ui/icons/Assignment';

const GreenAvatar = experimentalStyled(Avatar)({
  color: '#fff',
  backgroundColor: green[500],
});

const OrangeAvatar = experimentalStyled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(deepOrange[500]),
  backgroundColor: deepOrange[500],
}));

export default function VariantAvatars() {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
      <OrangeAvatar variant="square">N</OrangeAvatar>
      <GreenAvatar variant="rounded">
        <AssignmentIcon />
      </GreenAvatar>
    </Box>
  );
}

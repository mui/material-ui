import * as React from 'react';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

export default function ShowZeroBadge() {
  return (
    <Box
      sx={{
        '& > *': {
          m: 1,
        },
      }}
    >
      <Badge color="secondary" badgeContent={0}>
        <MailIcon />
      </Badge>
      <Badge color="secondary" badgeContent={0} showZero>
        <MailIcon />
      </Badge>
    </Box>
  );
}

import * as React from 'react';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';

export default function DotBadge() {
  return (
    <Box
      sx={{
        '& > *': {
          m: 1,
        },
      }}
    >
      <Badge color="secondary" variant="dot">
        <MailIcon />
      </Badge>
      <Badge color="secondary" variant="dot">
        <Typography>Typography</Typography>
      </Badge>
    </Box>
  );
}

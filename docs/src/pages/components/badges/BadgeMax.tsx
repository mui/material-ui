import * as React from 'react';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

const defaultProps = {
  color: 'secondary' as 'secondary',
  children: <MailIcon />,
};

export default function BadgeMax() {
  return (
    <Box
      sx={{
        '& > *': {
          margin: 2,
        },
      }}
    >
      <Badge badgeContent={99} {...defaultProps} />
      <Badge badgeContent={100} {...defaultProps} />
      <Badge badgeContent={1000} max={999} {...defaultProps} />
    </Box>
  );
}

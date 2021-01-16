import * as React from 'react';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';

const shapeStyles = { bgcolor: 'primary.main', width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: '50%' };

export default function BadgeOverlap() {
  const rectangle = <Box sx={shapeStyles} />;
  const circle = <Box sx={{ ...shapeStyles, ...shapeCircleStyles }} />;

  return (
    <Box
      sx={{
        '& > *': {
          margin: 1,
        },
      }}
    >
      <Badge color="secondary" badgeContent=" ">
        {rectangle}
      </Badge>
      <Badge color="secondary" badgeContent=" " variant="dot">
        {rectangle}
      </Badge>
      <Badge color="secondary" overlap="circular" badgeContent=" ">
        {circle}
      </Badge>
      <Badge color="secondary" overlap="circular" badgeContent=" " variant="dot">
        {circle}
      </Badge>
    </Box>
  );
}

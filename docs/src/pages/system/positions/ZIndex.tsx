import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function ZIndex() {
  return (
    <Typography
      component="div"
      variant="body1"
      style={{ height: 100, width: '100%', position: 'relative' }}
    >
      <Box
        bgcolor="grey.700"
        color="white"
        p={2}
        position="absolute"
        top={40}
        left="40%"
        zIndex="tooltip"
      >
        z-index tooltip
      </Box>
      <Box
        bgcolor="background.paper"
        color="text.primary"
        p={2}
        position="absolute"
        top={0}
        left="43%"
        zIndex="modal"
      >
        z-index modal
      </Box>
    </Typography>
  );
}

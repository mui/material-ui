import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Background() {
  return (
    <Typography component="div" variant="body1">
      <Box bgcolor="primary.main" color="primary.contrastText" p={2} m={1}>
        primary.main
      </Box>
      <Box bgcolor="secondary.main" color="secondary.contrastText" p={2} m={1}>
        secondary.main
      </Box>
      <Box bgcolor="error.main" color="error.contrastText" p={2} m={1}>
        error.main
      </Box>
      <Box bgcolor="text.primary" color="background.paper" p={2} m={1}>
        text.primary
      </Box>
      <Box bgcolor="text.secondary" color="background.paper" p={2} m={1}>
        text.secondary
      </Box>
      <Box bgcolor="text.disabled" color="background.paper" p={2} m={1}>
        text.disabled
      </Box>
      <Box bgcolor="text.hint" color="background.paper" p={2} m={1}>
        text.hint
      </Box>
    </Typography>
  );
}

export default Background;

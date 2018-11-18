import React from 'react';
import Typography from '@material-ui/core/Typography';
import { unstable_Box as Box } from '@material-ui/core/Box';

function Background() {
  return (
    <Typography component="div" variant="body1">
      <Box bg="primary.main" color="primary.contrastText" p={2} m={1}>
        primary.main
      </Box>
      <Box bg="secondary.main" color="secondary.contrastText" p={2} m={1}>
        secondary.main
      </Box>
      <Box bg="error.main" color="error.contrastText" p={2} m={1}>
        error.main
      </Box>
      <Box bg="text.primary" color="background.paper" p={2} m={1}>
        text.primary
      </Box>
      <Box bg="text.secondary" color="background.paper" p={2} m={1}>
        text.secondary
      </Box>
      <Box bg="text.disabled" color="background.paper" p={2} m={1}>
        text.disabled
      </Box>
      <Box bg="text.hint" color="background.paper" p={2} m={1}>
        text.hint
      </Box>
    </Typography>
  );
}

export default Background;

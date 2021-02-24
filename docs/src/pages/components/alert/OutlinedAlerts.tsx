import * as React from 'react';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/core/Alert';

export default function BasicAlerts() {
  return (
    <Box
      sx={{
        width: '100%',
        '& > * + *': {
          mt: 2,
        },
      }}
    >
      <Alert variant="outlined" severity="error">
        This is an error alert — check it out!
      </Alert>
      <Alert variant="outlined" severity="warning">
        This is a warning alert — check it out!
      </Alert>
      <Alert variant="outlined" severity="info">
        This is an info alert — check it out!
      </Alert>
      <Alert variant="outlined" severity="success">
        This is a success alert — check it out!
      </Alert>
    </Box>
  );
}

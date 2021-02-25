import * as React from 'react';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/core/Alert';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export default function IconAlerts() {
  return (
    <Box
      sx={{
        width: '100%',
        '& > * + *': {
          mt: 2,
        },
      }}
    >
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        This is a success alert — check it out!
      </Alert>
      <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
      >
        This is a success alert — check it out!
      </Alert>
      <Alert icon={false} severity="success">
        This is a success alert — check it out!
      </Alert>
    </Box>
  );
}

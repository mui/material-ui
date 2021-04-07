import * as React from 'react';
import Alert from '@material-ui/core/Alert';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Stack from '@material-ui/core/Stack';

export default function IconAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
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
    </Stack>
  );
}

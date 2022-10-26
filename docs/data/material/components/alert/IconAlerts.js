import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';

export default function IconAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        This success Alert has a one-off custom icon.
      </Alert>
      <Alert icon={false} severity="success">
        This success Alert has no icon.
      </Alert>
      <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
      >
        This success Alert uses `iconMapping` to override the default icon...
      </Alert>
      <Alert severity="success">
        ...which means that all other success Alerts after it will use the same
        icon...
      </Alert>
      <Alert severity="success">
        ...so the `iconMapping` prop is better suited for global theming.
      </Alert>
    </Stack>
  );
}

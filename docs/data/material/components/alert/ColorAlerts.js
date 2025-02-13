import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function ColorAlerts() {
  return (
    <Alert severity="success" color="warning">
      This is a success Alert with warning colors.
    </Alert>
  );
}

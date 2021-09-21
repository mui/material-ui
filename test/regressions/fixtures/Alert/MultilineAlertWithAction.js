import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

export default function MultilineAlertWithAction() {
  return (
    <Alert
      action={
        <Button color="inherit" size="small">
          UNDO
        </Button>
      }
    >
      <Typography as="div">This is the first line.</Typography>
      <Typography as="div">This is the second line.</Typography>
    </Alert>
  );
}

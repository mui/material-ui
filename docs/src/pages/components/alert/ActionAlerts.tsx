import * as React from 'react';
import Alert from '@material-ui/core/Alert';
import Button from '@material-ui/core/Button';
import Stack from '@material-ui/core/Stack';

export default function ActionAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>
      <Alert
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        This is a success alert — check it out!
      </Alert>
    </Stack>
  );
}

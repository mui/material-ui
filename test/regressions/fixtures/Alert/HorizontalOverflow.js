import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';

export default function MultilineAlertWithAction() {
  return (
    <Box sx={{ width: 500 }}>
      <Alert
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        <Typography as="div">{'a'.repeat(500)}</Typography>
      </Alert>
    </Box>
  );
}

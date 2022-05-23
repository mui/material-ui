import * as React from 'react';
import SnackbarsProvider from '@mui/lab/SnackbarsProvider';
import useSnackbars from '@mui/lab/useSnackbars';
import Button from '@mui/material/Button';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MyApp() {
  const snackbars = useSnackbars();

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Button
        variant="outlined"
        onClick={() =>
          snackbars.show({
            content: (key: string) => (
              <Alert
                onClose={snackbars.close(key)}
                severity="success"
                sx={{ width: '100%' }}
              >
                This is a success message!
              </Alert>
            ),
          })
        }
      >
        Open success snackbar
      </Button>
      <Alert severity="success">This is a success message!</Alert>
    </Stack>
  );
}

export default function CustomizedSnackbars() {
  return (
    <SnackbarsProvider autoHideDuration={4000}>
      <MyApp />
    </SnackbarsProvider>
  );
}

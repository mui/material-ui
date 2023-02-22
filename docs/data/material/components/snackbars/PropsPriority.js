import * as React from 'react';
import SnackbarsProvider from '@mui/lab/SnackbarsProvider';
import useSnackbars from '@mui/lab/useSnackbars';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';

function MyApp() {
  const snackbars = useSnackbars();
  return (
    <Button
      onClick={() =>
        snackbars.show({
          message: 'Note archived',
          autoHideDuration: 3000,
          TransitionComponent: Collapse,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      }
    >
      Show Snackbar
    </Button>
  );
}

export default function PropsPriority() {
  return (
    <SnackbarsProvider
      autoHideDuration={5000}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MyApp />
    </SnackbarsProvider>
  );
}

import * as React from 'react';
import SnackbarsProvider from '@mui/lab/SnackbarsProvider';
import useSnackbars from '@mui/lab/useSnackbars';
import Button from '@mui/material/Button';

function MyApp() {
  const snackbars = useSnackbars();

  return (
    <React.Fragment>
      <Button
        onClick={() =>
          snackbars.show({
            message: 'Note archived',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
          })
        }
      >
        Top-Center
      </Button>
      <Button
        onClick={() =>
          snackbars.show({
            message: 'Note archived',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          })
        }
      >
        Top-Right
      </Button>
      <Button
        onClick={() =>
          snackbars.show({
            message: 'Note archived',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          })
        }
      >
        Bottom-Right
      </Button>
      <Button
        onClick={() =>
          snackbars.show({
            message: 'Note archived',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
          })
        }
      >
        Bottom-Center
      </Button>
      <Button
        onClick={() =>
          snackbars.show({
            message: 'Note archived',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
          })
        }
      >
        Bottom-Left
      </Button>
      <Button
        onClick={() =>
          snackbars.show({
            message: 'Note archived',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          })
        }
      >
        Top-Left
      </Button>
    </React.Fragment>
  );
}

export default function PositionedSnackbars() {
  return (
    <SnackbarsProvider limit={6} autoHideDuration={4000}>
      <MyApp />
    </SnackbarsProvider>
  );
}

import * as React from 'react';
import SnackbarsProvider from '@mui/lab/SnackbarsProvider';
import useSnackbars from '@mui/lab/useSnackbars';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function MyApp() {
  const snackbars = useSnackbars();

  return (
    <Button
      onClick={() =>
        snackbars.show({
          message: 'Note archived',
          action: (key) => (
            <React.Fragment>
              <Button color="secondary" size="small" onClick={snackbars.close(key)}>
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={snackbars.close(key)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          ),
        })
      }
    >
      Open simple snackbar
    </Button>
  );
}

export default function BasicStackedSnackbars() {
  return (
    <SnackbarsProvider autoHideDuration={4000}>
      <MyApp />
    </SnackbarsProvider>
  );
}

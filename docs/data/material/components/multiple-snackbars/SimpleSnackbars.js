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
        snackbars.showSnackbar({
          message: 'Note archived',
          action: (key) => (
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                onClick={snackbars.closeSnackbar(key)}
              >
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={snackbars.closeSnackbar(key)}
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

export default function SimpleSnackbars() {
  return (
    <SnackbarsProvider autoHideDuration={4000}>
      <MyApp />
    </SnackbarsProvider>
  );
}

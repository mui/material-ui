import * as React from 'react';
import SnackbarsProvider from '@mui/lab/SnackbarsProvider';
import Button from '@mui/material/Button';
import useSnackbars from '@mui/lab/useSnackbars';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function MyApp() {
  const snackbars = useSnackbars();

  return (
    <React.Fragment>
      <Button onClick={() => snackbars.showSnackbar({ message: 'Note Archived' })}>
        Show Snackbar 1 with same action
      </Button>
      <Button onClick={() => snackbars.showSnackbar({ message: 'I love snacks' })}>
        Show Snackbar 2 with same action
      </Button>
    </React.Fragment>
  );
}

export default function GlobalActionSnackbars() {
  const snackbarRef = React.useRef(null);

  return (
    <SnackbarsProvider
      ref={snackbarRef}
      autoHideDuration={4000}
      action={(key) => (
        <React.Fragment>
          <Button
            color="secondary"
            size="small"
            onClick={snackbarRef.current.closeSnackbar(key)}
          >
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={snackbarRef.current.closeSnackbar(key)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      )}
    >
      <MyApp />
    </SnackbarsProvider>
  );
}

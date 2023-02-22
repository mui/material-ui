import * as React from 'react';
import SnackbarsProvider from '@mui/lab/SnackbarsProvider';
import Button from '@mui/material/Button';
import useSnackbars from '@mui/lab/useSnackbars';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MyApp() {
  const snackbars = useSnackbars();

  return (
    <React.Fragment>
      <Button onClick={() => snackbars.show()}>
        Show Snackbar 1 with same content
      </Button>
      <Button onClick={() => snackbars.show()}>
        Show Snackbar 2 with same content
      </Button>
    </React.Fragment>
  );
}

const GlobalContentSnackbar = (snackbarRef) => {
  return function Content(key) {
    return (
      <Alert
        onClose={snackbarRef.current.close(key)}
        severity="warning"
        sx={{ width: '100%' }}
      >
        This is a warning message!
      </Alert>
    );
  };
};

export default function GlobalContentSnackbars() {
  const snackbarRef = React.useRef(null);

  return (
    <SnackbarsProvider
      ref={snackbarRef}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      content={GlobalContentSnackbar(snackbarRef)}
    >
      <MyApp />
    </SnackbarsProvider>
  );
}

import * as React from 'react';
import SnackbarsProvider from '@mui/lab/SnackbarsProvider';
import useSnackbars from '@mui/lab/useSnackbars';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SnackbarAction = (snackbars) => {
  return function Action(key) {
    return (
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
    );
  };
};

function MyApp() {
  const snackbars = useSnackbars();

  return (
    <Button
      onClick={() =>
        snackbars.show({
          message: 'Note archived',
          action: SnackbarAction(snackbars),
        })
      }
    >
      Open various stacked snackbars
    </Button>
  );
}

export default function StackedSnackbars() {
  return (
    <SnackbarsProvider autoHideDuration={4000}>
      <MyApp />
    </SnackbarsProvider>
  );
}

import * as React from 'react';
import SnackbarsProvider from '@mui/material/SnackbarsProvider';
import useSnackbars from '@mui/material/useSnackbars';
import Button from '@mui/material/Button';

function MultipleSnackbars() {
  const snackbars = useSnackbars();

  return (
    <div>
      <Button
        onClick={() =>
          snackbars.showSnackbar({
            message: 'Note archived',
            autoHideDuration: 3000,
          })
        }
      >
        Open simple snackbar
      </Button>
      <Button
        onClick={() =>
          snackbars.showSnackbar({
            message: 'Note archived',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          })
        }
      >
        Open top right snackbar
      </Button>
      <Button
        onClick={() =>
          snackbars.showSnackbar({
            message: 'Note archived',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
          })
        }
      >
        Fade Transition
      </Button>
    </div>
  );
}

export default function MyApp() {
  return (
    <React.Fragment>
      <SnackbarsProvider limit={10} autoHideDuration={5000}>
        <MultipleSnackbars />
      </SnackbarsProvider>
    </React.Fragment>
  );
}

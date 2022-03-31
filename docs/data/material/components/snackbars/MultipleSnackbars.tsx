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
    </div>
  );
}

export default function MyApp() {
  return (
    <React.Fragment>
      <SnackbarsProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MultipleSnackbars />
      </SnackbarsProvider>
    </React.Fragment>
  );
}

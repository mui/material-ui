import * as React from 'react';
import SnackbarsProvider from '@mui/lab/SnackbarsProvider';
import useSnackbars from '@mui/lab/useSnackbars';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Slide, { SlideProps } from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

function MultipleSnackbars() {
  const snackbars = useSnackbars();

  return (
    <div>
      <Button
        onClick={() =>
          snackbars.showSnackbar({
            message: 'Note archived',
            autoHideDuration: 10000,
            action: (key: string) => (
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
            TransitionComponent: Collapse,
          })
        }
      >
        Collapse Transition
      </Button>
      <Button
        onClick={() =>
          snackbars.showSnackbar({
            message: 'Note archived',
            anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
            TransitionComponent: TransitionRight,
          })
        }
      >
        Transition Right
      </Button>
      <Button
        onClick={() =>
          snackbars.showSnackbar({
            anchorOrigin: { vertical: 'top', horizontal: 'left' },
            content: (key: string) => (
              <Alert onClose={snackbars.closeSnackbar(key)} severity="success">
                This is a success message!
              </Alert>
            ),
          })
        }
      >
        Customized Snackbar
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

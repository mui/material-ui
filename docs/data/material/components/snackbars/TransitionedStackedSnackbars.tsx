import * as React from 'react';
import SnackbarsProvider from '@mui/lab/SnackbarsProvider';
import useSnackbars from '@mui/lab/useSnackbars';
import Fade from '@mui/material/Fade';
import Slide, { SlideProps } from '@mui/material/Slide';
import Button from '@mui/material/Button';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

function MyApp() {
  const snackbars = useSnackbars();

  return (
    <React.Fragment>
      <Button onClick={() => snackbars.show({ message: 'I love snacks' })}>
        Grow Transition
      </Button>
      <Button
        onClick={() =>
          snackbars.show({
            message: 'I love snacks',
            TransitionComponent: Fade,
          })
        }
      >
        Fade Transition
      </Button>
      <Button
        onClick={() =>
          snackbars.show({
            message: 'I love snacks',
            TransitionComponent: SlideTransition,
          })
        }
      >
        Slide Transition
      </Button>
    </React.Fragment>
  );
}

export default function TransitionedSnackbars() {
  return (
    <SnackbarsProvider autoHideDuration={4000}>
      <MyApp />
    </SnackbarsProvider>
  );
}

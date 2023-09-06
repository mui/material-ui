import * as React from 'react';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Snackbar, { SnackbarOrigin } from '@mui/joy/Snackbar';

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function PositionedSnackbar() {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="plain"
          onClick={handleClick({ vertical: 'top', horizontal: 'center' })}
        >
          TOP-CENTER
        </Button>
      </Box>
      <Grid container justifyContent="center">
        <Grid xs={6}>
          <Button
            variant="plain"
            onClick={handleClick({ vertical: 'top', horizontal: 'left' })}
          >
            TOP-LEFT
          </Button>
        </Grid>
        <Grid xs={6} textAlign="right">
          <Button
            variant="plain"
            onClick={handleClick({ vertical: 'top', horizontal: 'right' })}
          >
            TOP-RIGHT
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button
            variant="plain"
            onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })}
          >
            BOTTOM-LEFT
          </Button>
        </Grid>
        <Grid xs={6} textAlign="right">
          <Button
            variant="plain"
            onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}
          >
            BOTTOM-RIGHT
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="plain"
          onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}
        >
          BOTTOM-CENTER
        </Button>
      </Box>
    </React.Fragment>
  );

  return (
    <Box sx={{ width: 500 }}>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        variant="solid"
        color="success"
        size="lg"
      >
        I love snacks
      </Snackbar>
    </Box>
  );
}

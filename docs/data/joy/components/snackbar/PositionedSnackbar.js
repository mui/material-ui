import * as React from 'react';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';

export default function PositionedSnackbar() {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
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
        key={vertical + horizontal}
      >
        I love snacks
      </Snackbar>
    </Box>
  );
}

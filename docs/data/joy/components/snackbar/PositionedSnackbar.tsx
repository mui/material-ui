import * as React from 'react';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Snackbar, { SnackbarOrigin } from '@mui/joy/Snackbar';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';

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
          startDecorator={<NorthIcon />}
          onClick={handleClick({ vertical: 'top', horizontal: 'center' })}
          sx={{ flexDirection: 'column', gap: 1, '--Button-gap': 0 }}
        >
          Top Center
        </Button>
      </Box>
      <Grid container justifyContent="center">
        <Grid xs={6}>
          <Button
            variant="plain"
            startDecorator={<NorthWestIcon />}
            onClick={handleClick({ vertical: 'top', horizontal: 'left' })}
          >
            Top Left
          </Button>
        </Grid>
        <Grid xs={6} textAlign="right" sx={{ mb: 2 }}>
          <Button
            variant="plain"
            endDecorator={<NorthEastIcon />}
            onClick={handleClick({ vertical: 'top', horizontal: 'right' })}
          >
            Top Right
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button
            variant="plain"
            startDecorator={<SouthWestIcon />}
            onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })}
          >
            Bottom Left
          </Button>
        </Grid>
        <Grid xs={6} textAlign="right">
          <Button
            variant="plain"
            endDecorator={<SouthEastIcon />}
            onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}
          >
            Bottom Right
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="plain"
          endDecorator={<SouthIcon />}
          onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}
          sx={{ flexDirection: 'column', gap: 1, '--Button-gap': 0 }}
        >
          Bottom Center
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
        key={vertical + horizontal}
      >
        I love snacks
      </Snackbar>
    </Box>
  );
}

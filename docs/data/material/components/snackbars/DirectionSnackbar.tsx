import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

export default function DirectionSnackbar() {
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const handleClick = (Transition: React.ComponentType<TransitionProps>) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClick(TransitionUp)}>Up</Button>
      </Box>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid size={6}>
          <Button onClick={handleClick(TransitionRight)}>Left</Button>
        </Grid>
        <Grid sx={{ textAlign: 'right' }} size={6}>
          <Button onClick={handleClick(TransitionLeft)}>Right</Button>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClick(TransitionDown)}>Down</Button>
      </Box>
      <Snackbar
        open={open}
        onClose={handleClose}
        slots={{ transition }}
        message="I love snacks"
        key={transition ? transition.name : ''}
      />
    </Box>
  );
}

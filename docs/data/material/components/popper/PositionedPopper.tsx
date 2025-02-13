import * as React from 'react';
import Box from '@mui/material/Box';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

export default function PositionedPopper() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <Box sx={{ width: 500 }}>
      <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 1200 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid item>
          <Button onClick={handleClick('top-start')}>top-start</Button>
          <Button onClick={handleClick('top')}>top</Button>
          <Button onClick={handleClick('top-end')}>top-end</Button>
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid item xs={6}>
          <Button onClick={handleClick('left-start')}>left-start</Button>
          <br />
          <Button onClick={handleClick('left')}>left</Button>
          <br />
          <Button onClick={handleClick('left-end')}>left-end</Button>
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="column"
          sx={{ alignItems: 'flex-end' }}
        >
          <Grid item>
            <Button onClick={handleClick('right-start')}>right-start</Button>
          </Grid>
          <Grid item>
            <Button onClick={handleClick('right')}>right</Button>
          </Grid>
          <Grid item>
            <Button onClick={handleClick('right-end')}>right-end</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid item>
          <Button onClick={handleClick('bottom-start')}>bottom-start</Button>
          <Button onClick={handleClick('bottom')}>bottom</Button>
          <Button onClick={handleClick('bottom-end')}>bottom-end</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

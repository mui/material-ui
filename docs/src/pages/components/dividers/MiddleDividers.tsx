import * as React from 'react';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export default function MiddleDividers() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          m: (theme) => theme.spacing(3, 2),
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">
              Toothbrush
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
              $4.50
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
          just down the hall.
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box
        sx={{
          m: 2,
        }}
      >
        <Typography gutterBottom variant="body1">
          Select type
        </Typography>
        <Box
          sx={{
            '& > .MuiChip-root': {
              m: 0.5,
            },
          }}
        >
          <Chip label="Extra Soft" />
          <Chip color="primary" label="Soft" />
          <Chip label="Medium" />
          <Chip label="Hard" />
        </Box>
      </Box>
      <Box
        sx={{
          m: (theme) => theme.spacing(3, 1, 1),
        }}
      >
        <Button>Add to cart</Button>
      </Box>
    </Box>
  );
}

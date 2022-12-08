import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <Sheet
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid>
          <Button sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src="/static/images/grid/complex.jpg" />
          </Button>
        </Grid>
        <Grid xs={12} sm container>
          <Grid xs container direction="column" spacing={2}>
            <Grid xs>
              <Typography gutterBottom level="h3" component="div">
                Standard license
              </Typography>
              <Typography level="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography level="body2" color="neutral">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid>
              <Typography sx={{ cursor: 'pointer' }} level="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            <Typography level="h3" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Sheet>
  );
}

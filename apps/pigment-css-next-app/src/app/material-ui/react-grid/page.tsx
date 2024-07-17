import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/PigmentGrid';
import { styled } from '@mui/material-pigment-css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function GridPage() {
  return (
    <React.Fragment>
      <section>
        <h2> Basic Grid</h2>
        <div className="demo-container">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 8 }}>
                <Item>xs=8</Item>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Item>xs=4</Item>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Item>xs=4</Item>
              </Grid>
              <Grid size={{ xs: 8 }}>
                <Item>xs=8</Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      </section>
      <section>
        <h2> Columns Grid</h2>
        <div className="demo-container">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
              <Grid size={{ xs: 8 }}>
                <Item>xs=8</Item>
              </Grid>
              <Grid size={{ xs: 8 }}>
                <Item>xs=8</Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      </section>
      <section>
        <h2> Responsive Grid</h2>
        <div className="demo-container">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {Array.from(Array(6)).map((_, index) => (
                <Grid size={{ xs: 2, sm: 4, md: 4, lg: 3 }} key={index}>
                  <Item>xs=2</Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </section>
    </React.Fragment>
  );
}

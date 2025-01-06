/* eslint-disable */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

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

export default function VariableWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        <Grid size="auto">
          <Item>size=auto</Item>
        </Grid>
        <Grid size={6}>
          <Item>size=6</Item>
        </Grid>
        <Grid size="grow">
          <Item>size=grow</Item>
        </Grid>

        <Grid size={12} container>
          <Grid size={10}>
            <Item>Nested 10 under a 12</Item>
          </Grid>
          <Grid size={2}>
            <Item>Nested 2 under a 12</Item>
          </Grid>
        </Grid>

        <Grid size={12} container spacing={1}>
          <Grid size={10}>
            <Item>Nested 10 under a 12 override spacing</Item>
          </Grid>
          <Grid size={2}>
            <Item>Nested 2 under a 12 override spacing</Item>
          </Grid>
        </Grid>

        <Grid size={12}>
          <Grid container>
            {/* Container not nested in container. Does not inherit spacing */}
            <Grid size={10}>
              <Item>Incorrectly nested 10 under a 12</Item>
            </Grid>
            <Grid size={2}>
              <Item>Incorrectly nested 2 under a 12</Item>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={12}>
          <>
            <Grid container>
              {/* Container not nested in container. Does not inherit spacing */}
              <Grid size={10}>
                <Item>Nested 10 under a 12 with fragment</Item>
              </Grid>
              <Grid size={2}>
                <Item>Nested 2 under a 12 with fragment</Item>
              </Grid>
            </Grid>
          </>
        </Grid>
      </Grid>
    </Box>
  );
}

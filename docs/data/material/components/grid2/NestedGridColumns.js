import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function NestedGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={24}>
        <Grid xs={8}>
          <Item>xs=8/24</Item>
        </Grid>
        <Grid container xs={16}>
          <Grid xs={12}>
            <Item>nested xs=12/24</Item>
          </Grid>
          <Grid xs={12}>
            <Item>nested xs=12/24</Item>
          </Grid>
        </Grid>
        <Grid xs={8}>
          <Item>xs=8/24</Item>
        </Grid>
        <Grid container xs={16} columns={12}>
          <Grid xs={6}>
            <Item>nested xs=6/12</Item>
          </Grid>
          <Grid xs={6}>
            <Item>nested xs=6/12</Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

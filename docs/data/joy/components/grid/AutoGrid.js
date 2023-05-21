import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export default function AutoGrid() {
  return (
    <Grid container spacing={3} sx={{ flexGrow: 1 }}>
      <Grid xs>
        <Item>xs</Item>
      </Grid>
      <Grid xs={6}>
        <Item>xs=6</Item>
      </Grid>
      <Grid xs>
        <Item>xs</Item>
      </Grid>
    </Grid>
  );
}

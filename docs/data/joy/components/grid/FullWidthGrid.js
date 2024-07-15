import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.background.level1,
  }),
}));

export default function FullWidthGrid() {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid size={{ xs: 6, md: 8 }}>
        <Item>xs=6 md=8</Item>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <Item>xs=6 md=4</Item>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <Item>xs=6 md=4</Item>
      </Grid>
      <Grid size={{ xs: 6, md: 8 }}>
        <Item>xs=6 md=8</Item>
      </Grid>
    </Grid>
  );
}

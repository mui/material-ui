import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ width: '100%' }}
    >
      <Grid xs={6}>
        <Item>1</Item>
      </Grid>
      <Grid xs={6}>
        <Item>2</Item>
      </Grid>
      <Grid xs={6}>
        <Item>3</Item>
      </Grid>
      <Grid xs={6}>
        <Item>4</Item>
      </Grid>
    </Grid>
  );
}

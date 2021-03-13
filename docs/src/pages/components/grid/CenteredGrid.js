import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CenteredGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Item>xs=12</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=6</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=6</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>xs=3</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>xs=3</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>xs=3</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>xs=3</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

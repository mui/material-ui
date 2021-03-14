import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  whiteSpace: 'nowrap',
  marginBottom: theme.spacing(1),
}));

export default function CSSGrid() {
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom component="div">
        Material-UI Grid:
      </Typography>
      <Grid container spacing={3}>
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
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" gutterBottom component="div">
        CSS Grid Layout:
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
        <Box sx={{ gridColumnEnd: 'span 3' }}>
          <Item>xs=3</Item>
        </Box>
        <Box sx={{ gridColumnEnd: 'span 3' }}>
          <Item>xs=3</Item>
        </Box>
        <Box sx={{ gridColumnEnd: 'span 3' }}>
          <Item>xs=3</Item>
        </Box>
        <Box sx={{ gridColumnEnd: 'span 3' }}>
          <Item>xs=3</Item>
        </Box>
        <Box sx={{ gridColumnEnd: 'span 8' }}>
          <Item>xs=8</Item>
        </Box>
        <Box sx={{ gridColumnEnd: 'span 4' }}>
          <Item>xs=4</Item>
        </Box>
      </Box>
    </div>
  );
}

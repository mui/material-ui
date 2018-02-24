import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: '24px',
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
});

const CSSGrid = withStyles(styles)(({ classes }) => (
  <div>
    <Typography variant="subheading" gutterBottom>
      Material-UI Grid:
    </Typography>
    <Grid container spacing={24}>
      <Grid item xs={1}>
        <Paper className={classes.paper}>xs 1</Paper>
      </Grid>
      <Grid item xs={1}>
        <Paper className={classes.paper}>xs 1</Paper>
      </Grid>
      <Grid item xs={1}>
        <Paper className={classes.paper}>xs 1</Paper>
      </Grid>
      <Grid item xs={1}>
        <Paper className={classes.paper}>xs 1</Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper className={classes.paper}>xs 2</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>xs 6</Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper className={classes.paper}>xs 8</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>xs 4</Paper>
      </Grid>
    </Grid>
    <hr />
    <Typography variant="subheading" gutterBottom>
      CSS-grid:
    </Typography>
    <div className={classes.container}>
      <div>
        <Paper className={classes.paper}>xs 1</Paper>
      </div>
      <div>
        <Paper className={classes.paper}>xs 1</Paper>
      </div>
      <div>
        <Paper className={classes.paper}>xs 1</Paper>
      </div>
      <div>
        <Paper className={classes.paper}>xs 1</Paper>
      </div>
      <div style={{ gridColumnEnd: 'span 2' }}>
        <Paper className={classes.paper}>xs 2</Paper>
      </div>
      <div style={{ gridColumnEnd: 'span 6' }}>
        <Paper className={classes.paper}>xs 6</Paper>
      </div>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <Paper className={classes.paper}>xs 8</Paper>
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <Paper className={classes.paper}>xs 4</Paper>
      </div>
    </div>
  </div>
));

export default CSSGrid;

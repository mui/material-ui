import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

function GridIntegration(props: WithWidth) {
  const classes = useStyles();
  const { width } = props;

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        Current width: {width}
      </Typography>
      <Grid container spacing={3}>
        <Hidden xsUp>
          <Grid item xs>
            <Paper className={classes.paper}>xsUp</Paper>
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid item xs>
            <Paper className={classes.paper}>smUp</Paper>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid item xs>
            <Paper className={classes.paper}>mdUp</Paper>
          </Grid>
        </Hidden>
        <Hidden lgUp>
          <Grid item xs>
            <Paper className={classes.paper}>lgUp</Paper>
          </Grid>
        </Hidden>
        <Hidden xlUp>
          <Grid item xs>
            <Paper className={classes.paper}>xlUp</Paper>
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

export default withWidth()(GridIntegration);

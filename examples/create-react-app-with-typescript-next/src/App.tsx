import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Chart, Deposits, Header, Orders, ProTip } from './components';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export const App = () => {
  const classes = useStyles();
  const fixedHeightPaper = classNames(classes.paper, classes.fixedHeight);
  return (
    <React.Fragment>
      <Header />

      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* ----- Chart ----- */}
          <Grid item sm={7} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid>

          {/* ----- Recent Deposits ----- */}
          <Grid item sm={5} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Deposits />
            </Paper>
          </Grid>

          {/* ----- Recent Orders ----- */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>

        {/* ----- Pro Tip ----- */}
        <ProTip />
      </Container>
    </React.Fragment>
  );
};

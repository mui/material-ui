import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: 160,
  },
  grid: {
    marginTop: 24,
  },
  img: {
    margin: '12px 24px',
  },
});

function HomeUsers(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <NoSsr>
        <Typography variant="h4" align="center" gutterBottom>
          Also trusted by these great brands:
        </Typography>
        <Grid container justify="center" className={classes.grid}>
          <img src="/static/images/users/nasa.png" alt="NASA logo" className={classes.img} />
          <img
            src="/static/images/users/walmart-labs.png"
            alt="Walmart Labs logo"
            className={classes.img}
          />
          <img src="/static/images/users/uniqlo.png" alt="Uniqlo logo" className={classes.img} />
          <img
            src="/static/images/users/capgemini.png"
            alt="Capgemini logo"
            className={classes.img}
          />
          <img
            src="/static/images/users/bethesda.png"
            alt="Bethesda logo"
            className={classes.img}
          />
        </Grid>
      </NoSsr>
    </div>
  );
}

HomeUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeUsers);

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

function About(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Material-UI
      </Typography>
      <Typography variant="subtitle1" component="h2" gutterBottom>
        about page
      </Typography>
      <Typography gutterBottom>
        <Link to="/">Go to the main page</Link>
      </Typography>
      <Button variant="contained" color="primary">
        Do nothing button
      </Button>
    </div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(About));

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { SnackbarContent } from 'material-ui/Snackbar';

const action = (
  <Button color="accent" dense>
    lorem ipsum dolorem
  </Button>
);

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
  },
  snackbar: {
    margin: theme.spacing.unit,
  },
});

function LongTextSnackbar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <SnackbarContent className={classes.snackbar} message="I love snacks." action={action} />
      <SnackbarContent
        className={classes.snackbar}
        message={
          'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'
        }
      />
      <SnackbarContent
        className={classes.snackbar}
        message="I love candy. I love cookies. I love cupcakes."
        action={action}
      />
      <SnackbarContent
        className={classes.snackbar}
        message={
          'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'
        }
        action={action}
      />
    </div>
  );
}

LongTextSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LongTextSnackbar);

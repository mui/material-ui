import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function ButtonSizes(props) {
  const { classes } = props;
  return (
    <div>
      <div>
        <Button size="small" className={classes.button}>
          Small
        </Button>
        <Button size="medium" className={classes.button}>
          Medium
        </Button>
        <Button size="large" className={classes.button}>
          Large
        </Button>
      </div>
      <div>
        <Button raised size="small" color="primary" className={classes.button}>
          Small
        </Button>
        <Button raised size="medium" color="primary" className={classes.button}>
          Medium
        </Button>
        <Button raised size="large" color="primary" className={classes.button}>
          Large
        </Button>
      </div>
      <div>
        <Button fab mini color="secondary" aria-label="add" className={classes.button}>
          <AddIcon />
        </Button>
        <Button fab color="secondary" aria-label="add" className={classes.button}>
          <AddIcon />
        </Button>
      </div>
    </div>
  );
}

ButtonSizes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSizes);

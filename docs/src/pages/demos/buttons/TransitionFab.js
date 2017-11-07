// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import CloseIcon from 'material-ui-icons/Close';
import AccountCircle from 'material-ui-icons/AccountCircle';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    display: 'block',
  },
});

class TransitionFab extends React.Component {
  state = {
    open: false,
  };

  toggleOpen = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        {open && (
          <div className={classes.fabcontainer}>
            <Button fab color="accent" aria-label="edit" className={classes.button}>
              <ModeEditIcon />
            </Button>
            <Button fab color="accent" aria-label="edit" className={classes.button}>
              <AccountCircle />
            </Button>
          </div>
        )}
        <Button
          fab
          color="primary"
          aria-label="add"
          className={classes.button}
          onClick={this.toggleOpen}
        >
          {open ? <CloseIcon /> : <AddIcon />}
        </Button>
      </div>
    );
  }
}

TransitionFab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransitionFab);

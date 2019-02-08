import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing(2),
  },
  iconHover: {
    margin: theme.spacing(2),
    '&:hover': {
      color: red[800],
    },
  },
});

function Icons(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Icon className={classes.icon}>add_circle</Icon>
      <Icon className={classes.icon} color="primary">
        add_circle
      </Icon>
      <Icon className={classes.icon} color="secondary">
        add_circle
      </Icon>
      <Icon className={classes.icon} color="action">
        add_circle
      </Icon>
      <Icon className={classes.iconHover} color="error" style={{ fontSize: 30 }}>
        add_circle
      </Icon>
      <Icon className={classes.icon} color="disabled" fontSize="large">
        add_circle
      </Icon>
    </div>
  );
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Icons);

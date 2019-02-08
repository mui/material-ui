import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(2),
  },
  affected: {
    textAlign: 'right',
  },
  unaffected: {
    flip: false,
    textAlign: 'right',
  },
});

function RtlOptOut(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.affected}>Affected</div>
      <div className={classes.unaffected}>Unaffected</div>
    </div>
  );
}

RtlOptOut.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RtlOptOut);

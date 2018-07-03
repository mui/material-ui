import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import RefreshIndicator from '@material-ui/lab/RefreshIndicator';

const styles = theme => ({
  indicator: {
    margin: theme.spacing.unit * 2,
  },
});

function ReadyIndicator(props) {
  const { classes } = props;
  return (
    <div>
      <RefreshIndicator
        percentage={30}
        size={40}
        left={10}
        top={0}
        status="ready"
        className={classes.indicator}
      />
      <RefreshIndicator
        percentage={60}
        size={40}
        left={10}
        top={0}
        status="ready"
        className={classes.indicator}
      />
      <RefreshIndicator
        percentage={80}
        size={40}
        left={10}
        top={0}
        status="ready"
        className={classes.indicator}
      />
      <RefreshIndicator
        percentage={100}
        size={40}
        left={10}
        top={0}
        status="ready"
        className={classes.indicator}
      />
    </div>
  );
}

ReadyIndicator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReadyIndicator);

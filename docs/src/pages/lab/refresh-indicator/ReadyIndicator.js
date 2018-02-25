import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import RefreshIndicator from '@material-ui/lab/RefreshIndicator';

const styles = theme => ({
});

function ReadyIndicator(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <RefreshIndicator
        percentage={30}
        size={40}
        left={10}
        top={0}
        status="ready"
      />
      <RefreshIndicator
        percentage={60}
        size={50}
        left={65}
        top={0}
        status="ready"
      />
      <RefreshIndicator
        percentage={80}
        size={60}
        left={120}
        top={0}
        color="red"
        status="ready"
      />
      <RefreshIndicator
        percentage={100}
        size={70}
        left={175}
        top={0}
        color="red" // Overridden by percentage={100}
        status="ready"
      />
    </div>
  );
}

ReadyIndicator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReadyIndicator);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const styles = theme => ({
});

function LoadingIndicator(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <RefreshIndicator
        size={40}
        left={10}
        top={0}
        status="loading"
      />
      <RefreshIndicator
        size={50}
        left={70}
        top={0}
        loadingColor="#FF9800"
        status="loading"
      />
    </div>
  );
}

LoadingIndicator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingIndicator);

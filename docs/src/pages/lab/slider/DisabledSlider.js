import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  container: {
    width: 300,
  },
};

function DisabledSlider({ classes }) {
  return (
    <div className={classes.container}>
      <Slider value={0} disabled />
      <Slider value={50} disabled />
      <Slider value={100} disabled />
    </div>
  );
}

DisabledSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisabledSlider);

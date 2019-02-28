import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '8px 0px',
  },
};

function DisabledSlider(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Slider className={classes.slider} value={0} disabled />
      <Slider className={classes.slider} value={50} disabled />
      <Slider className={classes.slider} value={100} disabled />
    </div>
  );
}

DisabledSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisabledSlider);

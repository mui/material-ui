import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import LensIcon from '@material-ui/icons/Lens';

const styles = {
  root: {
    width: 300,
  },
  thumbIcon: {
    borderRadius: '50%',
  },
};

class CustomIconSlider extends React.Component {
  state = {
    value: 50,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Typography id="label">Image thumb</Typography>
        <Slider
          value={value}
          aria-labelledby="label"
          onChange={this.handleChange}
          thumb={
            <img
              alt="slider thumb icon"
              src="/static/images/misc/circle.png"
              className={classes.thumbIcon}
            />
          }
        />
        <Typography id="label">Icon thumb</Typography>
        <Slider
          value={value}
          aria-labelledby="label"
          onChange={this.handleChange}
          thumb={<LensIcon style={{ color: '#2196f3' }} />}
        />
      </div>
    );
  }
}

CustomIconSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomIconSlider);

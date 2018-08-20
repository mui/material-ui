import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import StarsIcon from '@material-ui/icons/Gamepad';

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
        <Typography id="label">Slider Image</Typography>
        <Slider
          value={value}
          aria-labelledby="label"
          onChange={this.handleChange}
          thumb={
            <img
              alt="slider thumb icon"
              src="/static/images/cards/live-from-space.jpg"
              className={classes.thumbIcon}
            />
          }
        />
        <Typography id="label">Slider Icon</Typography>
        <Slider
          value={value}
          aria-labelledby="label"
          onChange={this.handleChange}
          thumb={<StarsIcon style={{ color: '#2196f3' }} />}
        />
      </div>
    );
  }
}

CustomIconSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomIconSlider);

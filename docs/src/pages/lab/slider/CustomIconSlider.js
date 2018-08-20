import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  root: {
    width: 300,
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
          thumb={<img src="/static/images/cards/live-from-space.jpg" alt="" />}
        />
        <Typography id="label">Slider Simple</Typography>
        <Slider value={value} aria-labelledby="label" onChange={this.handleChange} />
        <Typography id="label">Slider Icon</Typography>
        <Slider
          value={value}
          aria-labelledby="label"
          onChange={this.handleChange}
          thumb={<DeleteIcon style={{ color: 'green' }} />}
        />
      </div>
    );
  }
}

CustomIconSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomIconSlider);

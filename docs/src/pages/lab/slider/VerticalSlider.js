import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  container: {
    display: 'flex',
    height: 300,
  },
};

class VerticalSlider extends React.Component {
  state = { value: 50 };
  handleChange = (event, value) => this.setState({ value });
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.container}>
        <Slider value={value} onChange={this.handleChange} vertical />
        <Slider value={value} onChange={this.handleChange} vertical reverse />
      </div>
    );
  }
}

VerticalSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VerticalSlider);

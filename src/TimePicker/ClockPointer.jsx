import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import * as clockType from '../constants/clock-types';

class ClockPointer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
  }

  getAngleStyle = () => {
    const { value } = this.props;
    const angle = (360 / 12) * value;

    return {
      transform: `rotateZ(${angle}deg)`,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        className={classes.pointer}
        style={this.getAngleStyle()}
      >
        <div className={classes.thumb} />
      </div>
    );
  }
}

const styles = theme => ({
  pointer: {
    width: 2,
    backgroundColor: theme.palette.primary[500],
    height: '40%',
    position: 'absolute',
    left: 'calc(50% - 1px)',
    bottom: '50%',
    transformOrigin: 'center bottom 0px',
    transition: 'transform .2s ease-in-out',
  },
  thumb: {
    width: 4,
    height: 4,
    backgroundColor: theme.palette.common.white,
    borderRadius: '100%',
    position: 'absolute',
    top: -5,
    left: -8,
    border: `7px solid ${theme.palette.primary[500]}`,
    boxSizing: 'content-box',
  },
});

export default withStyles(styles)(ClockPointer);


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import * as clockType from '../constants/clock-types';

const positions = [
  [0, 5],
  [54.5, 16.6],
  [94.4, 59.5],
  [109, 114],
  [94.4, 168.5],
  [54.5, 208.4],
  [0, 223],
  [-54.5, 208.4],
  [-94.4, 168.5],
  [-109, 114],
  [-94.4, 59.5],
  [-54.5, 19.6],
];

class ClockNumber extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(clockType)).isRequired,
    classes: PropTypes.object.isRequired,
  }

  getLabel = (index, type) => {
    if (index === 0) {
      return '12';
    }

    return index.toString();
  }

  getTransformStyle = (index) => {
    const position = positions[index];

    return {
      transform: `translate(${position[0]}px, ${position[1]}px`,
    };
  }

  render() {
    const {
      label, type, index, classes,
    } = this.props;

    return (
      <div
        className={classes.clockNumber}
        style={this.getTransformStyle(index)}
      >
        { this.getLabel(index, type) }
      </div>
    );
  }
}

const styles = {
  clockNumber: {
    width: 32,
    height: 32,
    position: 'absolute',
    left: 'calc(50% - 16px)',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default withStyles(styles)(ClockNumber);


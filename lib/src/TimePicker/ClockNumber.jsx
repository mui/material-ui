import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from 'material-ui';

const positions = [
  [0, 5],
  [55, 19.6],
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

const innerPositions = [
  [0, 40],
  [36.9, 49.9],
  [64, 77],
  [74, 114],
  [64, 151],
  [37, 178],
  [0, 188],
  [-37, 178],
  [-64, 151],
  [-74, 114],
  [-64, 77],
  [-37, 50],
];

export class ClockNumber extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
  }

  getTransformStyle = (index) => {
    const position = positions[index];

    return {
      transform: `translate(${position[0]}px, ${position[1]}px`,
    };
  }

  render() {
    const {
      selected, label, index, classes,
    } = this.props;

    const className = classnames(classes.clockNumber, {
      [classes.selected]: selected,
    });

    return (
      <div
        className={className}
        style={this.getTransformStyle(index)}
      >
        { label }
      </div>
    );
  }
}

const styles = theme => ({
  clockNumber: {
    width: 32,
    height: 32,
    position: 'absolute',
    left: 'calc(50% - 16px)',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    color: theme.palette.type === 'light'
      ? theme.palette.text.primary
      : theme.palette.text.hint,
  },
  selected: {
    color: 'white',
  },
});

export default withStyles(styles, { name: 'MuiPickersClockNumber' })(ClockNumber);


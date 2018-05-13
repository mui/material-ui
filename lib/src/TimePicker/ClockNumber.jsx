import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';

const positions = {
  0: [0, 40],
  1: [55, 19.6],
  2: [94.4, 59.5],
  3: [109, 114],
  4: [94.4, 168.5],
  5: [54.5, 208.4],
  6: [0, 223],
  7: [-54.5, 208.4],
  8: [-94.4, 168.5],
  9: [-109, 114],
  10: [-94.4, 59.5],
  11: [-54.5, 19.6],
  12: [0, 5],
  13: [36.9, 49.9],
  14: [64, 77],
  15: [74, 114],
  16: [64, 151],
  17: [37, 178],
  18: [0, 188],
  19: [-37, 178],
  20: [-64, 151],
  21: [-74, 114],
  22: [-64, 77],
  23: [-37, 50],
};

export class ClockNumber extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    isInner: PropTypes.bool,
  }

  static defaultProps = {
    isInner: false,
  }

  getTransformStyle = (index) => {
    const position = positions[index];

    return {
      transform: `translate(${position[0]}px, ${position[1]}px`,
    };
  }

  render() {
    const {
      selected, label, index, classes, isInner,
    } = this.props;

    const className = classnames(classes.clockNumber, {
      [classes.selected]: selected,
    });

    return (
      <Typography
        variant={isInner ? 'body1' : 'subheading'}
        component="span"
        className={className}
        style={this.getTransformStyle(index, isInner)}
      >
        { label }
      </Typography>
    );
  }
}

const styles = (theme) => {
  const size = theme.spacing.unit * 4;
  return {
    clockNumber: {
      width: size,
      height: size,
      userSelect: 'none',
      position: 'absolute',
      left: `calc(50% - ${size / 2}px)`,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      color: theme.palette.type === 'light'
        ? theme.palette.text.primary
        : theme.palette.text.hint,
    },
    selected: {
      color: theme.palette.common.white,
    },
  };
};

export default withStyles(styles, { name: 'MuiPickersClockNumber' })(ClockNumber);

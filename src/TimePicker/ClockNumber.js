import React, {Component, PropTypes} from 'react';
import {isInner} from './timeUtils';

function getStyles(props, context) {
  const styles = {
    root: {
      display: 'inline-block',
      position: 'absolute',
      width: 32,
      height: 32,
      borderRadius: '100%',
      left: 'calc(50% - 16px)',
      top: 10,
      textAlign: 'center',
      paddingTop: 5,
      userSelect: 'none', /* Chrome all / Safari all */
      fontSize: '1.1em',
      pointerEvents: 'none',
      boxSizing: 'border-box',
    },
  };

  const {muiTheme} = context;

  let pos = props.value;

  if (props.type === 'hour') {
    pos %= 12;
  } else {
    pos = pos / 5;
  }

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

  if (props.isSelected) {
    styles.root.backgroundColor = muiTheme.timePicker.accentColor;
    styles.root.color = muiTheme.timePicker.selectTextColor;
  }

  let transformPos = positions[pos];

  if (isInner(props)) {
    styles.root.width = 28;
    styles.root.height = 28;
    styles.root.left = 'calc(50% - 14px)';
    transformPos = innerPositions[pos];
  }

  const [x, y] = transformPos;

  styles.root.transform = `translate(${x}px, ${y}px)`;

  return styles;
}

class ClockNumber extends Component {
  static propTypes = {
    isSelected: PropTypes.bool,
    onSelected: PropTypes.func,
    type: PropTypes.oneOf(['hour', 'minute']),
    value: PropTypes.number,
  };

  static defaultProps = {
    value: 0,
    type: 'minute',
    isSelected: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const clockNumber = this.props.value === 0 ? '00' : this.props.value;

    return (
      <span style={prepareStyles(styles.root)}>{clockNumber}</span>
    );
  }
}

export default ClockNumber;

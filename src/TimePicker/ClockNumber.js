// @flow weak

import React, { PropTypes, Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import { isInner } from '../utils/timeUtils';

function getTransformPos(props) {
  let pos = props.value;

  if (props.type === 'hour') {
    pos %= 12;
  } else {
    pos /= 5;
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

  let transformPos = positions[pos];

  if (isInner(props)) {
    transformPos = innerPositions[pos];
  }

  const [x, y] = transformPos;

  return `translate(${x}px, ${y}px)`;
}


export const styleSheet = createStyleSheet('ClockNumber', (theme) => {
  return {
    root: {
      directionInvariant: true,
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
    selection: {
      backgroundColor: theme.palette.primary[500], // timePicker.accentColor
      color: theme.palette.primary[100], // timePicker.selectTextColor;
    },
    inner: {
      width: '28',
      height: '28',
      left: 'calc(50% - 14px)',
    },
  };
});

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
    styleManager: PropTypes.object.isRequired,
  };

  static muiName = 'ClockNumber';

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    const clockNumber = this.props.value === 0 ? '00' : this.props.value;

    return (
      <span
        className={classNames(classes.root,
          { [classes.selection]: this.props.isSelected,
            [classes.inner]: isInner(this.props) }
          )}
        style={{ transform: getTransformPos(this.props) }}
      >
        {clockNumber}
      </span>
    );
  }
}

export default ClockNumber;

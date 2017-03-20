// @flow weak

import React, { PropTypes, Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import { isInner } from '../utils/timeUtils';

function getTransformPos(props) {
  let pos = props.value;
  let { radius } = props;

  if (props.type === 'hour') {
    pos %= 12;
  } else {
    pos /= 5;
  }

  if (isInner(props)) {
    radius -= 32;
  }

  const x = radius * Math.cos(((2 * Math.PI) / 12) * ((pos + 9) % 12));
  const y = radius * Math.sin(((2 * Math.PI) / 12) * ((pos + 9) % 12));

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
      top: 'calc(50% - 16px)',
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
    radius: PropTypes.number,
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
            [classes.inner]: isInner(this.props) },
          )}
        style={{ transform: getTransformPos(this.props) }}
      >
        {clockNumber}
      </span>
    );
  }
}

export default ClockNumber;

// @flow weak

import React, { PropTypes, Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import { isInner } from '../utils/timeUtils';

function calcAngle(value, base) {
  value %= base;
  const angle = (360 / base) * value;
  return angle;
}

export const styleSheet = createStyleSheet('ClockPointer', (theme) => {
  return {
    root: {
      height: '40%',
      background: theme.palette.primary[500],
      width: 2,
      left: 'calc(50% - 1px)',
      position: 'absolute',
      bottom: '50%',
      transformOrigin: 'bottom',
      pointerEvents: 'none',
    },
    mark: {
      boxSizing: 'content-box',
      background: theme.palette.primary[100],
      border: `4px solid ${theme.palette.primary[500]}`,
      width: 7,
      height: 7,
      position: 'absolute',
      top: -5,
      left: -6,
      borderRadius: '100%',
    },
    inner: {
      height: '30%',
    },
    selected: {
      display: 'none',
    },
  };
});

class ClockPointer extends Component {
  static propTypes = {
    hasSelected: PropTypes.bool,
    type: PropTypes.oneOf(['hour', 'minute']),
    value: PropTypes.number,
  };

  static defaultProps = {
    hasSelected: false,
    value: null,
    type: 'minute',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static muiName = 'ClockPointer';

  state = {
    inner: false,
  };

  componentWillMount() {
    this.setState({
      inner: isInner(this.props),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      inner: isInner(nextProps),
    });
  }

  render() {
    if (this.props.value === null) {
      return <span />;
    }

    const { hasSelected, type, value } = this.props;
    const { inner } = this.state;
    const angle = type === 'hour' ? calcAngle(value, 12) : calcAngle(value, 60);
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div
        className={classNames(classes.root,
          { [classes.inner]: inner })}
        style={{ transform: `rotateZ(${angle}deg)` }}
      >
        <div className={classNames(classes.mark, { [classes.selected]: hasSelected })} />
      </div>
    );
  }
}

export default ClockPointer;

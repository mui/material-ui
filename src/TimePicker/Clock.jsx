import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

import ClockPointer from './ClockPointer';
import * as clockType from '../constants/clock-types';
import { getMinutes, getHours } from './utils/time-utils';

export class Clock extends Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.values(clockType)).isRequired,
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
  }

  setTime(e, isFinish = false) {
    let { offsetX, offsetY } = e;

    if (typeof offsetX === 'undefined') {
      const rect = e.target.getBoundingClientRect();

      offsetX = e.changedTouches[0].clientX - rect.left;
      offsetY = e.changedTouches[0].clientY - rect.top;
    }

    const value = this.props.type === clockType.MINUTES
      ? getMinutes(offsetX, offsetY)
      : getHours(offsetX, offsetY);

    this.props.onChange(value, isFinish);
  }

  handleTouchMove = (e) => {
    this.setTime(e);
  }

  handleTouchEnd = (e) => {
    this.handleTouchMove(e);
  }

  handleUp = (event) => {
    event.preventDefault();
    this.setTime(event.nativeEvent, true);
  };

  handleMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari
    const isButtonPressed = typeof e.buttons === 'undefined'
      ? e.nativeEvent.which === 1
      : e.buttons === 1;

    if (isButtonPressed) {
      this.setTime(e.nativeEvent, false);
    }
  };

  hasSelected = () => {
    const { type, value } = this.props;

    if (type === clockType.HOURS) {
      return true;
    }

    return value % 5 === 0;
  }

  render() {
    const {
      classes, value, children, type,
    } = this.props;

    return (
      <div className={classes.container}>
        <div
          className={classes.clock}
        >
          <div
            role="menu"
            tabIndex={-1}
            className={classes.squareMask}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
            onMouseUp={this.handleUp}
            onMouseMove={this.handleMove}
          />

          <ClockPointer
            max={type === clockType.HOURS ? 12 : 60}
            hasSelected={this.hasSelected()}
            value={value}
          />

          { children }
        </div>
      </div>
    );
  }
}

const styles = () => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 40,
  },
  clock: {
    backgroundColor: 'rgba(0,0,0,.07)',
    borderRadius: '50%',
    height: 260,
    width: 260,
    position: 'relative',
    pointerEvents: 'none',
  },
  squareMask: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'auto',
    outline: 'none',
  },
});

export default withStyles(styles, { name: 'MuiPickersClock' })(Clock);


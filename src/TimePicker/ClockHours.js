// @flow weak

import React, { PropTypes, Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ClockNumber from './ClockNumber';
import ClockPointer from './ClockPointer';
import { getTouchEventOffsetValues, rad2deg } from '../utils/timeUtils';


export const styleSheet = createStyleSheet('ClockHours', () => {
  return {
    root: {
      height: '100%',
      width: '100%',
      borderRadius: '100%',
      position: 'relative',
      pointerEvents: 'none',
      boxSizing: 'border-box',
    },

    hitMask: {
      height: '100%',
      width: '100%',
      pointerEvents: 'auto',
    },
  };
});

class ClockHours extends Component {
  static propTypes = {
    format: PropTypes.oneOf(['ampm', '24hr']),
    initialHours: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    initialHours: new Date().getHours(),
    onChange: () => {},
    format: 'ampm',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static muiName = 'ClockHours';


  componentDidMount() {
    const clockElement = this.mask;
    this.center = {
      x: clockElement.offsetWidth / 2,
      y: clockElement.offsetHeight / 2,
    };

    this.basePoint = {
      x: this.center.x,
      y: 0,
    };
  }

  mask = undefined;
  center = undefined;
  basePoint = undefined;
  clock = undefined;

  isMousePressed = (event) => {
    if (typeof event.buttons === 'undefined') {
      return event.nativeEvent.which;
    }

    return event.buttons;
  }

  handleUp = (event) => {
    event.preventDefault();
    this.setClock(event.nativeEvent, true);
  };

  handleMove = (event) => {
    event.preventDefault();
    if (this.isMousePressed(event) !== 1) return;
    this.setClock(event.nativeEvent, false);
  };

  handleTouchMove = (event) => {
    event.preventDefault();
    this.setClock(event.changedTouches[0], false);
  };

  handleTouchEnd = (event) => {
    event.preventDefault();
    this.setClock(event.changedTouches[0], true);
  };

  setClock(event, finish) {
    if (typeof event.offsetX === 'undefined') {
      const offset = getTouchEventOffsetValues(event);

      event.offsetX = offset.offsetX;
      event.offsetY = offset.offsetY;
    }

    const hours = this.getHours(event.offsetX, event.offsetY);

    this.props.onChange(hours, finish);
  }

  getHours(offsetX, offsetY) {
    const step = 30;
    const x = offsetX - this.center.x;
    const y = offsetY - this.center.y;
    const cx = this.basePoint.x - this.center.x;
    const cy = this.basePoint.y - this.center.y;

    const atan = Math.atan2(cx, cy) - Math.atan2(x, y);

    let deg = rad2deg(atan);
    deg = Math.round(deg / step) * step;
    deg %= 360;

    let value = Math.floor(deg / step) || 0;

    const delta = Math.pow(x, 2) + Math.pow(y, 2);
    const distance = Math.sqrt(delta);

    value = value || 12;
    if (this.props.format === '24hr') {
      if (distance < 90) {
        value += 12;
        value %= 24;
      }
    } else {
      value %= 12;
    }

    return value;
  }

  getSelected() {
    let hour = this.props.initialHours;

    if (this.props.format === 'ampm') {
      hour %= 12;
      hour = hour || 12;
    }

    return hour;
  }

  getHourNumbers() {
    const style = {
      pointerEvents: 'none',
    };
    const hourSize = this.props.format === 'ampm' ? 12 : 24;

    const hours = [];
    for (let i = 1; i <= hourSize; i += 1) {
      hours.push(i % 24);
    }
    return hours.map((hour) => {
      const isSelected = this.getSelected() === hour;
      return (
        <ClockNumber
          key={hour}
          style={style}
          isSelected={isSelected}
          radius={this.mask ? this.mask.offsetWidt * 0.4 : 112}
          type="hour"
          value={hour}
        />
      );
    });
  }

  render() {
    const hours = this.getSelected();
    const numbers = this.getHourNumbers();
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div ref={(clock) => { this.clock = clock; }} className={classNames(classes.root)} >
        <ClockPointer hasSelected value={hours} type="hour" />
        {numbers}
        <div
          ref={(mask) => { this.mask = mask; }}
          className={classNames(classes.hitMask)}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onMouseUp={this.handleUp}
          onMouseMove={this.handleMove}
        />
      </div>
    );
  }
}

export default ClockHours;

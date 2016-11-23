// @flow weak

import React, { PropTypes, Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ClockNumber from './ClockNumber';
import ClockPointer from './ClockPointer';
import { getTouchEventOffsetValues, rad2deg } from '../utils/timeUtils';

export const styleSheet = createStyleSheet('ClockMinutes', () => {
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

class ClockQuadrant extends Component {
  static propTypes = {
    format: PropTypes.oneOf(['ampm', '24hr']),
    initialNumber: PropTypes.number,
    mode: PropTypes.string,
    onChange: PropTypes.func,
    quadrantDimension: PropTypes.number,
  };

  static defaultProps = {
    initialNumber: 0,
    onChange: () => {},
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  center = undefined;
  basePoint = undefined;

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
    if (this.isMousePressed(event) !== 1) {
      return;
    }
    this.setClock(event.nativeEvent, false);
  };

  handleTouch = (event) => {
    event.preventDefault();
    this.setClock(event.changedTouches[0], event.type === 'touchend');
  };

  setClock(event, finish) {
    if (typeof event.offsetX === 'undefined') {
      const offset = getTouchEventOffsetValues(event);

      event.offsetX = offset.offsetX;
      event.offsetY = offset.offsetY;
    }

    const number = this.getNumber(event.offsetX, event.offsetY);

    this.props.onChange(number, finish);
  }

  getNumber(offsetX, offsetY) {
    const step = 6;
    const x = offsetX - this.center.x;
    const y = offsetY - this.center.y;
    const cx = this.basePoint.x - this.center.x;
    const cy = this.basePoint.y - this.center.y;

    const atan = Math.atan2(cx, cy) - Math.atan2(x, y);

    let deg = rad2deg(atan);
    deg = Math.round(deg / step) * step;
    deg %= 360;

    const value = Math.floor(deg / step) || 0;

    return value;
  }

  getNumbers(width, mode) {
    let size = 12;
    if (mode !== 'minute') {
      if (this.props.format === '24hr') {
        size = 24;
      }
    }
    const numbers = [];
    for (let i = 0; i < size; i += 1) {
      if (mode === 'minute') {
          
      }
      numbers.push(i * (mode === 'minute' ? 5 : 1));
    }
    const selectedNumber = this.props.initialNumber;
    let hasSelected = false;

    const circleNumbers = numbers.map((num) => {
      const isSelected = selectedNumber === num;
      if (isSelected) {
        hasSelected = true;
      }
      return (
        <ClockNumber
          key={num}
          isSelected={isSelected}
          type={mode}
          radius={width * 0.4}
          value={num}
        />
      );
    });

    return {
      circleNumbers,
      hasSelected,
      selected: selectedNumber,
    };
  }

  render() {
    const { quadrantDimension, mode } = this.props;
    const numbers = this.getNumbers(quadrantDimension, mode);
    const classes = this.context.styleManager.render(styleSheet);
    this.center = {
      x: quadrantDimension / 2,
      y: quadrantDimension / 2,
    };

    this.basePoint = {
      x: this.center.x,
      y: 0,
    };
    return (
      <div className={classNames(classes.root)} >
        <ClockPointer value={numbers.selected} type={mode} hasSelected={numbers.hasSelected} />
        {numbers.circleNumbers}
        <div
          className={classNames(classes.hitMask)}
          onTouchMove={this.handleTouch}
          onTouchEnd={this.handleTouch}
          onMouseUp={this.handleUp}
          onMouseMove={this.handleMove}
        />
      </div>
    );
  }
}

export default ClockQuadrant;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';

import ClockPointer from './ClockPointer';
import * as clockType from '../constants/clock-types';
import { getMinutes, getHours } from '../_helpers/time-utils';

export class Clock extends Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.keys(clockType).map(key => clockType[key])).isRequired,
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    ampm: PropTypes.bool,
  }

  static defaultProps = {
    ampm: false,
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
      : getHours(offsetX, offsetY, this.props.ampm);

    this.props.onChange(value, isFinish);
  }

  handleTouchMove = (e) => {
    this.isMoving = true;
    this.setTime(e);
  }

  handleMouseUp = (e) => {
    if (this.isMoving) {
      this.isMoving = false;
    }
    this.setTime(e.nativeEvent, true);
  }

  handleTouchEnd = (e) => {
    if (this.isMoving) {
      this.setTime(e.nativeEvent, true);
      this.isMoving = false;
    }
  }

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
      classes, value, children, type, ampm,
    } = this.props;

    const max = type === clockType.HOURS ? 12 : 60;
    const isPointerInner = !ampm && type === clockType.HOURS && (value < 1 || value > 12);

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
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMove}
          />

          <div className={classes.pin} />

          <ClockPointer
            max={max}
            value={value}
            isInner={isPointerInner}
            hasSelected={this.hasSelected()}
          />

          { children }
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: [[theme.spacing.unit * 4, 0, theme.spacing.unit]],
  },
  clock: {
    backgroundColor: 'rgba(0,0,0,.07)',
    borderRadius: '50%',
    height: 260,
    width: 260,
    position: 'relative',
    pointerEvents: 'none',
    zIndex: 1,
  },
  squareMask: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'auto',
    outline: 'none',
    touchActions: 'none',
  },
  pin: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

export default withStyles(styles, { name: 'MuiPickersClock' })(Clock);


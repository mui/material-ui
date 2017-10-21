import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

import ClockPointer from './ClockPointer';
import * as clockType from '../constants/clock-types';
import { getMinutes, getHours } from './utils/time-utils';

class Clock extends Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.values(clockType)).isRequired,
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
  }

  setTime(e, finish) {
    if (typeof e.offsetX === 'undefined') {
      console.warn('Touch events not supporting');
    }

    const value = this.props.type === clockType.MINUTES
      ? getMinutes(e.offsetX, e.offsetY)
      : getHours(e.offsetX, e.offsetY);

    this.props.onChange(value, finish);
  }

  handleUp = (event) => {
    event.preventDefault();
    this.setTime(event.nativeEvent, true);
  };

  handleMove = (e) => {
    e.preventDefault();
    if (e.buttons !== 1) { return; }

    this.setTime(e.nativeEvent, false);
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

const styles = theme => ({
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
  },
});

export default withStyles(styles)(Clock);


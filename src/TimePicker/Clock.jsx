import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

import ClockNumber from './ClockNumber';
import ClockPointer from './ClockPointer';
import * as clockType from '../constants/clock-types';
import { getHours } from './utils/time-utils';

class Clock extends Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.values(clockType)).isRequired,
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  setTime(e, finish) {
    if (typeof e.offsetX === 'undefined') {
      console.warn('Touch events not supporting');
    }

    const hours = getHours(e.offsetX, e.offsetY);
    console.log(hours);
    this.props.onChange(hours, finish);
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

    return false;
  }

  render() {
    const { classes, type, value } = this.props;

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

          <ClockPointer hasSelected={this.hasSelected()} value={value} />

          <ClockNumber type={type} value={value} index={0} />
          <ClockNumber type={type} value={value} index={1} />
          <ClockNumber type={type} value={value} index={2} />
          <ClockNumber type={type} value={value} index={3} />
          <ClockNumber type={type} value={value} index={4} />
          <ClockNumber type={type} value={value} index={5} />
          <ClockNumber type={type} value={value} index={6} />
          <ClockNumber type={type} value={value} index={7} />
          <ClockNumber type={type} value={value} index={8} />
          <ClockNumber type={type} value={value} index={9} />
          <ClockNumber type={type} value={value} index={10} />
          <ClockNumber type={type} value={value} index={11} />
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


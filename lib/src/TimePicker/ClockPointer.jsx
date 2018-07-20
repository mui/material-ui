import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';
import * as clockType from '../constants/clock-types';

export class ClockPointer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    hasSelected: PropTypes.bool.isRequired,
    isInner: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(Object.keys(clockType).map(key => clockType[key])).isRequired,
  }

  state = {
    toAnimateTransform: false,
    previousType: undefined, // eslint-disable-line
  }

  static getDerivedStateFromProps = (nextProps, state) => {
    if (nextProps.type !== state.previousType) {
      return {
        toAnimateTransform: true,
        previousType: nextProps.type,
      };
    }

    return {
      toAnimateTransform: false,
      previousType: nextProps.type,
    };
  }

  getAngleStyle = () => {
    const { value, isInner, type } = this.props;

    const max = type === clockType.HOURS ? 12 : 60;
    let angle = (360 / max) * value;

    if (type === clockType.HOURS && value > 12) {
      angle -= 360; // round up angle to max 360 degrees
    }

    return {
      height: isInner ? '26%' : '40%',
      transform: `rotateZ(${angle}deg)`,
    };
  }

  render() {
    const { classes, hasSelected } = this.props;

    return (
      <div
        style={this.getAngleStyle()}
        className={classnames(classes.pointer, {
          [classes.animateTransform]: this.state.toAnimateTransform,
        })}
      >
        <div className={classnames(classes.thumb, { [classes.noPoint]: hasSelected })} />
      </div>
    );
  }
}

const styles = theme => ({
  pointer: {
    width: 2,
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    left: 'calc(50% - 1px)',
    bottom: '50%',
    transformOrigin: 'center bottom 0px',
  },
  animateTransform: {
    transition: theme.transitions.create(['transform', 'height']),
  },
  thumb: {
    width: 4,
    height: 4,
    backgroundColor: theme.palette.common.white,
    borderRadius: '100%',
    position: 'absolute',
    top: -21,
    left: -15,
    border: `14px solid ${theme.palette.primary.main}`,
    boxSizing: 'content-box',
  },
  noPoint: {
    backgroundColor: theme.palette.primary.main,
  },
});

export default withStyles(styles, { name: 'MuiPickersClockPointer' })(ClockPointer);


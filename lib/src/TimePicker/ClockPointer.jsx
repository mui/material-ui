import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import classnames from 'classnames';
import * as clockType from '../constants/clock-types';

export class ClockPointer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    hasSelected: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(Object.values(clockType)).isRequired,
  }

  getAngleStyle = () => {
    const { value, type } = this.props;
    const max = type === clockType.HOURS ? 12 : 60;

    const angle = (360 / max) * value;
    const isInner = type === clockType.HOURS && (value < 1 || value > 12);

    return {
      height: isInner ? '26%' : '40%',
      transform: `rotateZ(${angle}deg)`,
    };
  }

  render() {
    const { classes, hasSelected } = this.props;

    return (
      <div
        className={classes.pointer}
        style={this.getAngleStyle()}
      >
        <div className={classnames(classes.thumb, { [classes.noPoint]: hasSelected })} />
      </div>
    );
  }
}

const styles = theme => ({
  pointer: {
    width: 2,
    backgroundColor: theme.palette.primary[500],
    position: 'absolute',
    left: 'calc(50% - 1px)',
    bottom: '50%',
    transformOrigin: 'center bottom 0px',
  },
  thumb: {
    width: 4,
    height: 4,
    backgroundColor: theme.palette.common.white,
    borderRadius: '100%',
    position: 'absolute',
    top: -21,
    left: -15,
    border: `14px solid ${theme.palette.primary[500]}`,
    boxSizing: 'content-box',
  },
  noPoint: {
    backgroundColor: theme.palette.primary[500],
  },
});

export default withStyles(styles, { name: 'MuiPickersClockPointer' })(ClockPointer);


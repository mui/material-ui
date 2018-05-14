import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';

export class ClockPointer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    hasSelected: PropTypes.bool.isRequired,
    isInner: PropTypes.bool.isRequired,
    max: PropTypes.number.isRequired,
  }

  getAngleStyle = () => {
    const {
      value, isInner, max,
    } = this.props;

    const angle = (360 / max) * value;

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
    backgroundColor: theme.palette.primary.main,
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
    border: `14px solid ${theme.palette.primary.main}`,
    boxSizing: 'content-box',
  },
  noPoint: {
    backgroundColor: theme.palette.primary.main,
  },
});

export default withStyles(styles, { name: 'MuiPickersClockPointer' })(ClockPointer);


import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import createStyles from '@material-ui/core/styles/createStyles';
import ClockType, { ClockTypeType } from '../../constants/ClockType';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core';

export interface ClockPointerProps extends WithStyles<typeof styles> {
  value: number;
  hasSelected: boolean;
  isInner: boolean;
  type: ClockTypeType;
}

export class ClockPointer extends React.Component<ClockPointerProps> {
  public static propTypes: any = {
    value: PropTypes.number.isRequired,
    hasSelected: PropTypes.bool.isRequired,
    isInner: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(Object.keys(ClockType).map(key => ClockType[key])).isRequired,
  };

  public static getDerivedStateFromProps = (
    nextProps: ClockPointerProps,
    state: ClockPointer['state']
  ) => {
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
  };

  public state = {
    toAnimateTransform: false,
    previousType: undefined,
  };

  public getAngleStyle = () => {
    const { value, isInner, type } = this.props;

    const max = type === ClockType.HOURS ? 12 : 60;
    let angle = (360 / max) * value;

    if (type === ClockType.HOURS && value > 12) {
      angle -= 360; // round up angle to max 360 degrees
    }

    return {
      height: isInner ? '26%' : '40%',
      transform: `rotateZ(${angle}deg)`,
    };
  };

  public render() {
    const { classes, hasSelected } = this.props;

    return (
      <div
        style={this.getAngleStyle()}
        className={clsx(classes.pointer, {
          [classes.animateTransform]: this.state.toAnimateTransform,
        })}
      >
        <div
          className={clsx(classes.thumb, {
            [classes.noPoint]: hasSelected,
          })}
        />
      </div>
    );
  }
}

export const styles = (theme: Theme) =>
  createStyles({
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

export default withStyles(styles, {
  name: 'MuiPickersClockPointer',
})(ClockPointer as React.ComponentType<ClockPointerProps>);

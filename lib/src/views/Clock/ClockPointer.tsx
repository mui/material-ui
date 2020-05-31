import * as React from 'react';
import clsx from 'clsx';
import { ClockViewType } from '../../constants/ClockType';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';

export interface ClockPointerProps
  extends React.HTMLProps<HTMLDivElement>,
    WithStyles<typeof styles> {
  value: number;
  hasSelected: boolean;
  isInner: boolean;
  type: ClockViewType;
}

export class ClockPointer extends React.Component<ClockPointerProps> {
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

    const max = type === 'hours' ? 12 : 60;
    let angle = (360 / max) * value;

    if (type === 'hours' && value > 12) {
      angle -= 360; // round up angle to max 360 degrees
    }

    return {
      height: isInner ? '26%' : '40%',
      transform: `rotateZ(${angle}deg)`,
    };
  };

  public render() {
    const { classes, hasSelected, isInner, type, value, ...other } = this.props;

    return (
      <div
        {...other}
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
      backgroundColor: theme.palette.primary.contrastText,
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

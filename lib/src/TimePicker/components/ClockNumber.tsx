import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import * as React from 'react';

const positions = {
  0: [0, 40],
  1: [55, 19.6],
  2: [94.4, 59.5],
  3: [109, 114],
  4: [94.4, 168.5],
  5: [54.5, 208.4],
  6: [0, 223],
  7: [-54.5, 208.4],
  8: [-94.4, 168.5],
  9: [-109, 114],
  10: [-94.4, 59.5],
  11: [-54.5, 19.6],
  12: [0, 5],
  13: [36.9, 49.9],
  14: [64, 77],
  15: [74, 114],
  16: [64, 151],
  17: [37, 178],
  18: [0, 188],
  19: [-37, 178],
  20: [-64, 151],
  21: [-74, 114],
  22: [-64, 77],
  23: [-37, 50],
};

export interface ClockNumberProps extends WithStyles<typeof styles> {
  index: number;
  label: string;
  selected: boolean;
  isInner?: boolean;
}

export class ClockNumber extends React.Component<ClockNumberProps> {
  public static propTypes: any = {
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    isInner: PropTypes.bool,
    innerRef: PropTypes.any,
  };

  public static defaultProps = {
    isInner: false,
  };

  public getTransformStyle = (index: number) => {
    const position = positions[index];

    return {
      transform: `translate(${position[0]}px, ${position[1]}px`,
    };
  };

  public render() {
    const { selected, label, index, classes, isInner } = this.props;

    const className = clsx(classes.clockNumber, {
      [classes.selected]: selected,
    });

    return (
      <Typography
        component="span"
        className={className}
        variant={isInner ? 'body2' : 'body1'}
        style={this.getTransformStyle(index)}
      >
        {label}
      </Typography>
    );
  }
}

export const styles = (theme: Theme) => {
  const size = theme.spacing(4);

  return createStyles({
    clockNumber: {
      width: size,
      height: size,
      userSelect: 'none',
      position: 'absolute',
      left: `calc(50% - ${size / 2}px)`,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      color: theme.palette.type === 'light' ? theme.palette.text.primary : theme.palette.text.hint,
    },
    selected: {
      color: theme.palette.common.white,
    },
  });
};

export default withStyles(styles, {
  name: 'MuiPickersClockNumber',
})(ClockNumber as React.ComponentType<ClockNumberProps>);

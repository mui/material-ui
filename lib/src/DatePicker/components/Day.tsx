import { Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface DayProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  current?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  selected?: boolean;
}

class Day extends React.PureComponent<DayProps> {
  public static propTypes: any = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    current: PropTypes.bool,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    selected: PropTypes.bool,
    innerRef: PropTypes.any,
  };

  public static defaultProps = {
    disabled: false,
    hidden: false,
    current: false,
    selected: false,
  };

  public render() {
    const { children, classes, disabled, hidden, current, selected, ...other } = this.props;

    const className = clsx(classes.day, {
      [classes.hidden]: hidden,
      [classes.current]: current,
      [classes.isSelected]: selected,
      [classes.isDisabled]: disabled,
    });

    return (
      <IconButton className={className} tabIndex={hidden || disabled ? -1 : 0} {...other}>
        {children}
      </IconButton>
    );
  }
}

export const styles = (theme: Theme) =>
  createStyles({
    day: {
      width: 36,
      height: 36,
      fontSize: theme.typography.caption.fontSize,
      margin: '0 2px',
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium,
      padding: 0,
    },
    hidden: {
      opacity: 0,
      pointerEvents: 'none',
    },
    current: {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
    isSelected: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    isDisabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint,
    },
  });

export default withStyles(styles, { name: 'MuiPickersDay' })(Day as React.ComponentType<DayProps>);

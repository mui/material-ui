import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { ButtonBase } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  theme => ({
    day: {
      margin: '1px 2px',
      width: 36,
      height: 36,
      borderRadius: '50%',
      padding: 0,
      color: theme.palette.text.primary,
      fontSize: theme.typography.caption.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      '&:focus': {
        backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
      },
      '&:hover': {
        backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
      },
    },
    hidden: {
      opacity: 0,
      pointerEvents: 'none',
    },
    current: {
      '&:not($daySelected)': {
        border: `1px solid ${theme.palette.text.hint}`,
      },
    },
    daySelected: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.short,
      }),
      '&:hover': {
        willChange: 'background-color',
        backgroundColor: theme.palette.primary.light,
      },
      '&:focus': {
        willChange: 'background-color',
        backgroundColor: theme.palette.primary.light,
      },
    },
    dayDisabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint,
    },
    dayLabel: {
      // need for overrides
    },
  }),
  { name: 'MuiPickersDay' }
);

export interface DayProps {
  /** Day text */
  children: React.ReactNode;
  /** Is today? */
  current?: boolean;
  /** Disabled? */
  disabled?: boolean;
  /** Hidden? */
  hidden?: boolean;
  /** Selected? */
  selected?: boolean;
}

export const Day: React.FC<DayProps> = ({
  children,
  disabled,
  hidden,
  current,
  selected,
  ...other
}) => {
  const classes = useStyles();
  const className = clsx(classes.day, {
    [classes.hidden]: hidden,
    [classes.current]: current,
    [classes.daySelected]: selected,
    [classes.dayDisabled]: disabled,
  });

  return (
    <ButtonBase
      data-mui-test="day"
      centerRipple
      className={className}
      tabIndex={hidden || disabled ? -1 : 0}
      {...other}
    >
      <span className={classes.dayLabel}>{children}</span>
    </ButtonBase>
  );
};

Day.displayName = 'Day';

Day.propTypes = {
  current: PropTypes.bool,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  selected: PropTypes.bool,
};

Day.defaultProps = {
  disabled: false,
  hidden: false,
  current: false,
  selected: false,
};

export default Day;

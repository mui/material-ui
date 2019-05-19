import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  (theme: Theme) => ({
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
    daySelected: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    dayDisabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint,
    },
  }),
  { name: 'MuiPickersDay' }
);

export interface DayProps {
  /** Day text */
  children: React.ReactNode;
  /** Is today */
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
    <IconButton className={className} tabIndex={hidden || disabled ? -1 : 0} {...other}>
      <Typography variant="body2" color="inherit">
        {children}
      </Typography>
    </IconButton>
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

import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles } from '@material-ui/core';

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
  }),
  { name: 'MuiPickersDay' }
);

export interface DayProps {
  children: React.ReactNode;
  current?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  selected?: boolean;
}

const Day: React.FC<DayProps> = ({ children, disabled, hidden, current, selected, ...other }) => {
  const classes = useStyles();
  const className = clsx(classes.day, {
    [classes.hidden]: hidden,
    [classes.current]: current,
    [classes.isSelected]: selected,
    [classes.isDisabled]: disabled,
  });

  return (
    <IconButton className={className} tabIndex={hidden || disabled ? -1 : 0} {...other}>
      <Typography variant="body2" color="inherit">
        {children}
      </Typography>
    </IconButton>
  );
};

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

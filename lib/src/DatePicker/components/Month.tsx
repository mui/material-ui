import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export interface MonthProps {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect: (value: any) => void;
  selected?: boolean;
  value: any;
}

export const useStyles = makeStyles<Theme>(
  theme => ({
    root: {
      flex: '1 0 33.33%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      height: 75,
      transition: theme.transitions.create('font-size', { duration: '100ms' }),
      '&:focus': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    selected: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    disabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint,
    },
  }),
  { name: 'MuiPickersMonth' }
);

export const Month: React.FC<MonthProps> = ({
  selected,
  onSelect,
  disabled,
  value,
  children,
  ...other
}) => {
  const classes = useStyles();
  const handleSelection = React.useCallback(() => {
    onSelect(value);
  }, [onSelect, value]);

  return (
    <Typography
      role="button"
      component="div"
      className={clsx(classes.root, {
        [classes.selected]: selected,
        [classes.disabled]: disabled,
      })}
      tabIndex={disabled ? -1 : 0}
      onClick={handleSelection}
      onKeyPress={handleSelection}
      color={selected ? 'primary' : undefined}
      variant={selected ? 'h5' : 'subtitle1'}
      children={children}
      {...other}
    />
  );
};

Month.displayName = 'Month';

export default Month;

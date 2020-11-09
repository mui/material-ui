import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { onSpaceOrEnter } from '../../_helpers/utils';

export interface MonthProps {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect: (value: any) => void;
  selected?: boolean;
  value: any;
}

export const useStyles = makeStyles(
  (theme) => ({
    root: {
      flex: '1 0 33.33%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      height: 64,
      transition: theme.transitions.create('font-size', { duration: '100ms' }),
      '&:focus': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:disabled': {
        pointerEvents: 'none',
        color: theme.palette.text.secondary,
      },
      '&$selected': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    selected: {},
  }),
  { name: 'MuiPickersMonth' }
);

export const Month: React.FC<MonthProps> = (props) => {
  const { disabled, onSelect, selected, value, ...other } = props;
  const classes = useStyles();
  const handleSelection = () => {
    onSelect(value);
  };

  return (
    <Typography
      data-mui-test="month"
      role="button"
      component="div"
      className={clsx(classes.root, {
        [classes.selected]: selected,
      })}
      tabIndex={disabled ? -1 : 0}
      onClick={handleSelection}
      onKeyDown={onSpaceOrEnter(handleSelection)}
      color={selected ? 'primary' : undefined}
      variant={selected ? 'h5' : 'subtitle1'}
      {...other}
    />
  );
};

Month.displayName = 'Month';

export default Month;

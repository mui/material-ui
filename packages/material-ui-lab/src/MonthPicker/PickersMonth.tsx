import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { MuiStyles, StyleRules, WithStyles, withStyles } from '@material-ui/core/styles';
import { onSpaceOrEnter } from '../internal/pickers/utils';

export interface MonthProps {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect: (value: any) => void;
  selected?: boolean;
  value: any;
}

export type PickersMonthClassKey = 'root' | 'selected';

export const styles: MuiStyles<PickersMonthClassKey> = (
  theme,
): StyleRules<PickersMonthClassKey> => ({
  root: {
    flex: '1 0 33.33%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    outline: 0,
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
});

/**
 * @ignore - do not document.
 */
const PickersMonth: React.FC<MonthProps & WithStyles<typeof styles>> = (props) => {
  const { classes, disabled, onSelect, selected, value, ...other } = props;
  const handleSelection = () => {
    onSelect(value);
  };

  return (
    <Typography
      data-mui-test="month"
      component="button"
      className={clsx(classes.root, {
        [classes.selected]: selected,
      })}
      tabIndex={disabled ? -1 : 0}
      onClick={handleSelection}
      onKeyDown={onSpaceOrEnter(handleSelection)}
      color={selected ? 'primary' : undefined}
      variant={selected ? 'h5' : 'subtitle1'}
      disabled={disabled}
      {...other}
    />
  );
};

export default withStyles(styles, { name: 'PrivatePickersMonth' })(PickersMonth);

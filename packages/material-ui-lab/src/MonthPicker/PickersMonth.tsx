import * as React from 'react';
import clsx from 'clsx';
import Typography, { TypographyTypeMap } from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { generateUtilityClasses } from '@material-ui/unstyled';
import { onSpaceOrEnter } from '../internal/pickers/utils';

const classes = generateUtilityClasses('PrivatePickersMonth', ['root', 'selected']);

export interface MonthProps {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect: (value: any) => void;
  selected?: boolean;
  value: any;
}

export type PickersMonthClassKey = keyof typeof classes;

const PickersMonthRoot = styled<
  OverridableComponent<TypographyTypeMap<{ component?: React.ElementType; disabled?: boolean }>>
>(Typography, {
  skipSx: true,
})(({ theme }) => ({
  flex: '1 0 33.33%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  height: 64,
  outline: 0,
  transition: theme.transitions.create('font-size', { duration: '100ms' }),
  '&:focus': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&:disabled': {
    pointerEvents: 'none',
    color: theme.palette.text.secondary,
  },
  [`&.${classes.selected}`]: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

/**
 * @ignore - do not document.
 */
const PickersMonth: React.FC<MonthProps> = (props) => {
  const { disabled, onSelect, selected, value, ...other } = props;

  const handleSelection = () => {
    onSelect(value);
  };

  return (
    <PickersMonthRoot
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

export default PickersMonth;

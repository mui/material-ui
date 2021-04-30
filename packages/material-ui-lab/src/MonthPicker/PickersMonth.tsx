import * as React from 'react';
import clsx from 'clsx';
import Typography, { TypographyTypeMap } from '@material-ui/core/Typography';
import {
  experimentalStyled,
  unstable_useThemeProps as useThemeProps,
  Theme,
} from '@material-ui/core/styles';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { onSpaceOrEnter } from '../internal/pickers/utils';
import pickersMonthClasses, { getPickersMonthUtilityClass } from './pickersMonthClasses';

export interface MonthProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onSelect: (value: any) => void;
  selected?: boolean;
  value: any;
}

export type PickersMonthClassKey = keyof typeof pickersMonthClasses;

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getPickersMonthUtilityClass, undefined);
};

const PickersMonthRoot = experimentalStyled<
  OverridableComponent<TypographyTypeMap<{ component?: React.ElementType; disabled?: boolean }>>
>(
  Typography,
  {},
  {
    name: 'MuiPickersMonth',
    slot: 'Root',
    overridesResolver: (props, styles) => styles.root,
  },
)(({ theme }) => ({
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
  [`&.${pickersMonthClasses.selected}`]: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

/**
 * @ignore - do not document.
 */
function PickersMonth(inProps: MonthProps) {
  const props = useThemeProps<Theme, MonthProps, 'MuiPickersMonth'>({
    props: inProps,
    name: 'MuiPickersMonth',
  });
  const { className, disabled, onSelect, selected, value, ...other } = props;

  const classes = useUtilityClasses();

  const handleSelection = () => {
    onSelect(value);
  };

  return (
    <PickersMonthRoot
      data-mui-test="month"
      component="button"
      className={clsx(classes.root, className)}
      tabIndex={disabled ? -1 : 0}
      onClick={handleSelection}
      onKeyDown={onSpaceOrEnter(handleSelection)}
      variant={selected ? 'h5' : 'subtitle1'}
      disabled={disabled}
      {...other}
      color={selected ? 'primary' : undefined}
    />
  );
}

export default PickersMonth;

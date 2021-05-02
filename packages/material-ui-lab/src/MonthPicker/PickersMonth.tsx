import * as React from 'react';
import clsx from 'clsx';
import Typography, { TypographyTypeMap } from '@material-ui/core/Typography';
import { experimentalStyled } from '@material-ui/core/styles';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { onSpaceOrEnter } from '../internal/pickers/utils';
import pickersMonthClasses, { getPickersMonthUtilityClass } from './pickersMonthClasses';

export interface MonthProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onSelect: (value: any) => void;
  selected?: boolean;
  value: any;
}

export type PickersMonthClassKey = keyof typeof pickersMonthClasses;

const useUtilityClasses = (styleProps: MonthProps) => {
  const { selected, disabled } = styleProps;
  const slots = {
    root: ['root', selected && 'selected', disabled && 'disabled'],
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
function PickersMonth(props: MonthProps) {
  const { className, disabled, onSelect, selected, value, ...other } = props;
  const styleProps = { ...props };

  const classes = useUtilityClasses(styleProps);

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
      color={selected ? 'primary' : undefined}
      disabled={disabled}
      styleProps={styleProps}
      {...other}
    />
  );
}

export default PickersMonth;

import * as React from 'react';
import clsx from 'clsx';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { experimentalStyled } from '@material-ui/core/styles';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
} from '@material-ui/unstyled';
import { ExtendMui } from './typings/helpers';

export function getPickersToolbarTextUtilityClass(slot: string) {
  return generateUtilityClass('MuiPickersToolbarText', slot);
}

export const pickersToolbarTextClasses = generateUtilityClasses('MuiPickersToolbarText', [
  'root',
  'selected',
]);

export interface PickersToolbarTextProps extends ExtendMui<TypographyProps> {
  classes?: Partial<typeof pickersToolbarTextClasses>;
  selected?: boolean;
  value: React.ReactNode;
}

export type PickersToolbarTextClassKey = keyof typeof pickersToolbarTextClasses;

const useUtilityClasses = (styleProps: PickersToolbarTextProps) => {
  const { selected, classes } = styleProps;

  const slots = {
    root: ['root', selected && 'selected'],
  };

  return composeClasses(slots, getPickersToolbarTextUtilityClass, classes);
};

const PickersToolbarTextRoot = experimentalStyled(
  Typography,
  {},
  { skipSx: true },
)<{ component?: React.ElementType }>(({ theme }) => ({
  transition: theme.transitions.create('color'),
  color: theme.palette.text.secondary,
  [`&.${pickersToolbarTextClasses.selected}`]: {
    color: theme.palette.text.primary,
  },
}));

const PickersToolbarText = React.forwardRef<HTMLSpanElement, PickersToolbarTextProps>(
  function PickersToolbarText(props, ref) {
    const { className, selected, value, ...other } = props;
    // TODO: convert to simple assignment after the type error in defaultPropsHandler.js:60:6 is fixed
    const styleProps = { ...props };

    const classes = useUtilityClasses(styleProps);

    return (
      <PickersToolbarTextRoot
        ref={ref}
        className={clsx(classes.root, className)}
        component="span"
        styleProps={styleProps}
        {...other}
      >
        {value}
      </PickersToolbarTextRoot>
    );
  },
);

export default PickersToolbarText;

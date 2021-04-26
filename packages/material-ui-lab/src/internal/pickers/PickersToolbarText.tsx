import * as React from 'react';
import clsx from 'clsx';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import {
  experimentalStyled,
  unstable_useThemeProps as useThemeProps,
} from '@material-ui/core/styles';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { ExtendMui } from './typings/helpers';
import pickersToolbarTextClasses, {
  getPickersToolbarTextUtilityClass,
} from './pickersToolbarTextClasses';

export interface PickersToolbarTextProps extends ExtendMui<TypographyProps> {
  component?: React.ElementType;
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
  {
    name: 'MuiPickersToolbarText',
    slot: 'Root',
    overridesResolver: (props, styles) => styles.root,
  },
)(({ theme }) => ({
  transition: theme.transitions.create('color'),
  color: theme.palette.text.secondary,
  [`&.${pickersToolbarTextClasses.selected}`]: {
    color: theme.palette.text.primary,
  },
}));

const PickersToolbarText = React.forwardRef<HTMLSpanElement, PickersToolbarTextProps>(
  function PickersToolbarText(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: 'MuiPickersToolbarText' });
    const { component = 'span', className, selected, value, ...other } = props;
    const styleProps = { ...props };

    const classes = useUtilityClasses(styleProps);

    return (
      <PickersToolbarTextRoot
        ref={ref}
        className={clsx(classes.root, className)}
        // TODO experimentalStyled should know component prop from Typography
        // @ts-expect-error 
        component={component}
        styleProps={styleProps}
        {...other}
      >
        {value}
      </PickersToolbarTextRoot>
    );
  },
);

export default PickersToolbarText;

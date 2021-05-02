import * as React from 'react';
import clsx from 'clsx';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { SxProps } from '@material-ui/system';
import {
  experimentalStyled,
  unstable_useThemeProps as useThemeProps,
  Theme,
} from '@material-ui/core/styles';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
} from '@material-ui/unstyled';
import { TypographyProps } from '@material-ui/core/Typography';
import PickersToolbarText from './PickersToolbarText';
import { ExtendMui } from './typings/helpers';

export const pickersToolbarButtonClasses = generateUtilityClasses('MuiPickersToolbarButton', [
  'root',
]);

export interface ToolbarButtonProps extends ExtendMui<ButtonProps, 'value' | 'variant'> {
  align?: TypographyProps['align'];
  classes?: typeof pickersToolbarButtonClasses;
  selected: boolean;
  sx?: SxProps<Theme>;
  typographyClassName?: string;
  value: React.ReactNode;
  variant: TypographyProps['variant'];
}

export type PickersToolbarButtonClassKey = keyof typeof pickersToolbarButtonClasses;

export function getPickersToolbarButtonUtilityClass(slot: string) {
  return generateUtilityClass('MuiPickersToolbarButton', slot);
}

const useUtilityClasses = (styleProps: ToolbarButtonProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getPickersToolbarButtonUtilityClass, classes);
};

const PickersToolbarButtonRoot = experimentalStyled(
  Button,
  {},
  {
    name: 'MuiPickersToolbarButton',
    slot: 'Root',
    overridesResolver: (props, styles: Record<PickersToolbarButtonClassKey, object>) => styles.root,
  },
)({
  padding: 0,
  minWidth: 16,
  textTransform: 'none',
});

const PickersToolbarButton: React.FunctionComponent<ToolbarButtonProps> = React.forwardRef(
  function PickersToolbarButton(inProps, ref) {
    const props = useThemeProps<Theme, ToolbarButtonProps, 'MuiPickersToolbarButton'>({
      props: inProps,
      name: 'MuiPickersToolbarButton',
    });
    const { align, className, selected, typographyClassName, value, variant, ...other } = props;
    const styleProps = { ...props };
    const classes = useUtilityClasses(styleProps);

    return (
      <PickersToolbarButtonRoot
        data-mui-test="toolbar-button"
        variant="text"
        ref={ref}
        className={clsx(classes.root, className)}
        styleProps={styleProps}
        {...other}
      >
        <PickersToolbarText
          align={align}
          className={typographyClassName}
          variant={variant}
          value={value}
          selected={selected}
        />
      </PickersToolbarButtonRoot>
    );
  },
);

export default PickersToolbarButton;

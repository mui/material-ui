import * as React from 'react';
import clsx from 'clsx';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { SxProps } from '@material-ui/system';
import {
  experimentalStyled,
  unstable_useThemeProps as useThemeProps,
  Theme,
} from '@material-ui/core/styles';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { TypographyProps } from '@material-ui/core/Typography';
import PickersToolbarText from './PickersToolbarText';
import { ExtendMui } from './typings/helpers';
import pickersToolbarButtonClasses, {
  getPickersToolbarButtonUtilityClass,
} from './pickersToolbarButtonClasses';

export interface ToolbarButtonProps extends ExtendMui<ButtonProps, 'value' | 'variant'> {
  align?: TypographyProps['align'];
  classes?: typeof pickersToolbarButtonClasses;
  selected: boolean;
  typographyClassName?: string;
  value: React.ReactNode;
  variant: TypographyProps['variant'];
  sx?: SxProps<Theme>;
}

export type PickersToolbarButtonClassKey = keyof typeof pickersToolbarButtonClasses;

const useUtilityClasses = (styleProps: ToolbarButtonProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getPickersToolbarButtonUtilityClass, classes);
};

const PickersToolbarButtonRoot = experimentalStyled(
  // TODO fix ts error
  // @ts-expect-error
  Button,
  {},
  {
    name: 'MuiPickersToolbarButton',
    slot: 'Root',
    overridesResolver: (props, styles: typeof pickersToolbarButtonClasses) => styles.root,
  },
)({
  padding: 0,
  minWidth: '16px',
  textTransform: 'none',
});

const ToolbarButton: React.FunctionComponent<ToolbarButtonProps> = React.forwardRef(
  function PickersToolbarButton(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: 'MuiPickersToolbarButton' });
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

export default ToolbarButton;

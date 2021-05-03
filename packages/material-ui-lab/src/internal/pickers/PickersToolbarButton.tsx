import * as React from 'react';
import clsx from 'clsx';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { SxProps } from '@material-ui/system';
import { experimentalStyled, Theme } from '@material-ui/core/styles';
import { TypographyProps } from '@material-ui/core/Typography';
import PickersToolbarText from './PickersToolbarText';
import { ExtendMui } from './typings/helpers';

export interface ToolbarButtonProps extends ExtendMui<ButtonProps, 'value' | 'variant'> {
  align?: TypographyProps['align'];
  classes?: { root?: string };
  selected: boolean;
  sx?: SxProps<Theme>;
  typographyClassName?: string;
  value: React.ReactNode;
  variant: TypographyProps['variant'];
}

export type PickersToolbarButtonClassKey = 'root';

const PickersToolbarButtonRoot = experimentalStyled(Button)({
  padding: 0,
  minWidth: 16,
  textTransform: 'none',
});

const PickersToolbarButton: React.FunctionComponent<ToolbarButtonProps> = React.forwardRef(
  function PickersToolbarButton(props, ref) {
    const {
      align,
      className,
      classes = {},
      selected,
      typographyClassName,
      value,
      variant,
      ...other
    } = props;

    return (
      <PickersToolbarButtonRoot
        data-mui-test="toolbar-button"
        variant="text"
        ref={ref}
        className={clsx('MuiPickersToolbarButton-root', classes.root, className)}
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

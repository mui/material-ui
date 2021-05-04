import * as React from 'react';
import clsx from 'clsx';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { MuiStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { TypographyProps } from '@material-ui/core/Typography';
import PickersToolbarText from './PickersToolbarText';
import { ExtendMui } from './typings/helpers';

export interface ToolbarButtonProps extends ExtendMui<ButtonProps, 'value' | 'variant'> {
  align?: TypographyProps['align'];
  selected: boolean;
  typographyClassName?: string;
  value: React.ReactNode;
  variant: TypographyProps['variant'];
}

export type PickersToolbarButtonClassKey = 'root';

export const styles: MuiStyles<PickersToolbarButtonClassKey> = {
  root: {
    padding: 0,
    minWidth: '16px',
    textTransform: 'none',
  },
};

const ToolbarButton: React.FunctionComponent<ToolbarButtonProps & WithStyles<typeof styles>> = (
  props,
) => {
  const {
    align,
    classes,
    className,
    selected,
    typographyClassName,
    value,
    variant,
    ...other
  } = props;

  return (
    <Button
      data-mui-test="toolbar-button"
      variant="text"
      className={clsx(classes.root, className)}
      {...other}
    >
      <PickersToolbarText
        align={align}
        className={typographyClassName}
        variant={variant}
        value={value}
        selected={selected}
      />
    </Button>
  );
};

export default withStyles(styles, { name: 'PrivatePickersToolbarButton' })(ToolbarButton);

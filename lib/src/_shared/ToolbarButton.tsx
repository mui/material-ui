import * as React from 'react';
import clsx from 'clsx';
import ToolbarText from './ToolbarText';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { ExtendMui } from '../typings/helpers';
import { makeStyles } from '@material-ui/core/styles';
import { TypographyProps } from '@material-ui/core/Typography';

export interface ToolbarButtonProps extends ExtendMui<ButtonProps, 'value' | 'variant'> {
  variant: TypographyProps['variant'];
  selected: boolean;
  value: React.ReactNode;
  align?: TypographyProps['align'];
  typographyClassName?: string;
}

export const useStyles = makeStyles(
  {
    toolbarBtn: {
      padding: 0,
      minWidth: '16px',
      textTransform: 'none',
    },
  },
  { name: 'MuiPickersToolbarButton' }
);

export const ToolbarButton: React.FunctionComponent<ToolbarButtonProps> = ({
  className = null,
  value: label,
  selected,
  variant,
  align,
  typographyClassName,
  ...other
}) => {
  const classes = useStyles();

  return (
    <Button variant="text" className={clsx(classes.toolbarBtn, className)} {...other}>
      <ToolbarText
        align={align}
        className={typographyClassName}
        variant={variant}
        value={label}
        selected={selected}
      />
    </Button>
  );
};

ToolbarButton.displayName = 'ToolbarButton';

export default ToolbarButton;

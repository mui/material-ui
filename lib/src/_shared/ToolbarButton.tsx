import * as React from 'react';
import clsx from 'clsx';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TypographyProps } from '@material-ui/core/Typography';
import ToolbarText from './ToolbarText';
import { ExtendMui } from '../typings/helpers';

export interface ToolbarButtonProps extends ExtendMui<ButtonProps, 'variant'> {
  variant: TypographyProps['variant'];
  selected: boolean;
  label: string;
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

const ToolbarButton: React.FunctionComponent<ToolbarButtonProps> = ({
  className = null,
  label,
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
        label={label}
        selected={selected}
      />
    </Button>
  );
};

export default ToolbarButton;

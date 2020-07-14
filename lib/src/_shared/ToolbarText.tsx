import * as React from 'react';
import clsx from 'clsx';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { ExtendMui } from '../typings/helpers';
import { makeStyles, fade } from '@material-ui/core/styles';

export interface ToolbarTextProps extends ExtendMui<TypographyProps> {
  selected?: boolean;
  value: React.ReactNode;
}

export const useStyles = makeStyles(
  theme => {
    const textColor =
      theme.palette.type === 'light'
        ? theme.palette.primary.contrastText
        : theme.palette.getContrastText(theme.palette.background.default);

    return {
      root: {
        transition: theme.transitions.create('color'),
        color: fade(textColor, 0.54),
        '&$selected': {
          color: textColor,
        },
      },
      selected: {},
    };
  },
  { name: 'MuiPickersToolbarText' }
);

const ToolbarText: React.FC<ToolbarTextProps> = ({
  className,
  selected,
  value: label,
  ...other
}) => {
  const classes = useStyles();
  return (
    <Typography
      children={label}
      className={clsx(classes.root, className, {
        [classes.selected]: selected,
      })}
      {...other}
    />
  );
};

export default ToolbarText;

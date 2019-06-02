import * as React from 'react';
import clsx from 'clsx';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core';
import { ExtendMui } from '../typings/extendMui';
import { makeStyles, fade } from '@material-ui/core/styles';

export interface ToolbarTextProps extends ExtendMui<TypographyProps> {
  selected?: boolean;
  label: string;
}

export const useStyles = makeStyles(
  (theme: Theme) => {
    const textColor =
      theme.palette.type === 'light'
        ? theme.palette.primary.contrastText
        : theme.palette.getContrastText(theme.palette.background.default);

    return {
      toolbarTxt: {
        color: fade(textColor, 0.54),
      },
      toolbarBtnSelected: {
        color: textColor,
      },
    };
  },
  { name: 'MuiPickersToolbarText' }
);

const ToolbarText: React.FunctionComponent<ToolbarTextProps> = ({
  selected,
  label,
  className = null,
  ...other
}) => {
  const classes = useStyles();
  return (
    <Typography
      children={label}
      className={clsx(classes.toolbarTxt, className, {
        [classes.toolbarBtnSelected]: selected,
      })}
      {...other}
    />
  );
};

export default ToolbarText;

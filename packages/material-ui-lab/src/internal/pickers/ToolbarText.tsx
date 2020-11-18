import * as React from 'react';
import clsx from 'clsx';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { createStyles, WithStyles, withStyles, Theme, alpha } from '@material-ui/core/styles';
import { ExtendMui } from './typings/helpers';

export interface ToolbarTextProps extends ExtendMui<TypographyProps> {
  selected?: boolean;
  value: React.ReactNode;
}

export const styles = (theme: Theme) => {
  const textColor =
    theme.palette.mode === 'light'
      ? theme.palette.primary.contrastText
      : theme.palette.getContrastText(theme.palette.background.default);

  return createStyles({
    root: {
      transition: theme.transitions.create('color'),
      color: alpha(textColor, 0.54),
      '&$selected': {
        color: textColor,
      },
    },
    selected: {},
  });
};

const ToolbarText: React.FC<ToolbarTextProps & WithStyles<typeof styles>> = (props) => {
  const { className, classes, selected, value, ...other } = props;

  return (
    <Typography
      className={clsx(classes.root, className, {
        [classes.selected]: selected,
      })}
      {...other}
    >
      {value}
    </Typography>
  );
};

export default withStyles(styles, { name: 'MuiPickersToolbarText' })(ToolbarText);

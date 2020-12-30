import * as React from 'react';
import clsx from 'clsx';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core/styles';
import { ExtendMui } from './typings/helpers';

export interface PickersToolbarTextProps extends ExtendMui<TypographyProps> {
  selected?: boolean;
  value: React.ReactNode;
}

export const styles = (theme: Theme) => {
  return createStyles({
    root: {
      transition: theme.transitions.create('color'),
      color: theme.palette.text.secondary,
      '&$selected': {
        color: theme.palette.text.primary,
      },
    },
    selected: {},
  });
};

export type PickersToolbarTextClassKey = keyof WithStyles<typeof styles>['classes'];

const PickersToolbarText: React.FC<PickersToolbarTextProps & WithStyles<typeof styles>> = (
  props,
) => {
  const { className, classes, selected, value, ...other } = props;

  return (
    <Typography
      className={clsx(classes.root, className, {
        [classes.selected]: selected,
      })}
      component="span"
      {...other}
    >
      {value}
    </Typography>
  );
};

export default withStyles(styles, { name: 'MuiPickersToolbarText' })(PickersToolbarText);

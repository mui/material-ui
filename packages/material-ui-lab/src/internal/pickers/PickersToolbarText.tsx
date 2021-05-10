import * as React from 'react';
import clsx from 'clsx';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { MuiStyles, StyleRules, WithStyles, withStyles } from '@material-ui/core/styles';
import { ExtendMui } from './typings/helpers';

export interface PickersToolbarTextProps extends ExtendMui<TypographyProps> {
  selected?: boolean;
  value: React.ReactNode;
}

export type PickersToolbarTextClassKey = 'root' | 'selected';
export const styles: MuiStyles<PickersToolbarTextClassKey> = (
  theme,
): StyleRules<PickersToolbarTextClassKey> => {
  return {
    root: {
      transition: theme.transitions.create('color'),
      color: theme.palette.text.secondary,
      '&$selected': {
        color: theme.palette.text.primary,
      },
    },
    selected: {},
  };
};

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

export default withStyles(styles, { name: 'PrivatePickersToolbarText' })(PickersToolbarText);

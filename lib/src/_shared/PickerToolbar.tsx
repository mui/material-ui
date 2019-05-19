import * as React from 'react';
import clsx from 'clsx';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import { Theme } from '@material-ui/core';
import { ExtendMui } from '../typings/extendMui';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

export interface PickerToolbarProps extends ExtendMui<ToolbarProps>, WithStyles<typeof styles> {}

const PickerToolbar: React.SFC<PickerToolbarProps> = ({
  children,
  className = null,
  classes,
  ...other
}) => {
  return (
    <Toolbar className={clsx(classes.toolbar, className)} {...other}>
      {children}
    </Toolbar>
  );
};

export const styles = (theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: 100,
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.primary.main
          : theme.palette.background.default,
    },
  });

export default withStyles(styles, { name: 'MuiPickersToolbar' })(PickerToolbar);

import * as React from 'react';
import clsx from 'clsx';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import { ExtendMui } from '../typings/extendMui';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  theme => ({
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
  }),
  { name: 'MuiPickersToolbar' }
);

const PickerToolbar: React.SFC<ExtendMui<ToolbarProps>> = ({
  children,
  className = null,
  ...other
}) => {
  const classes = useStyles();

  return (
    <Toolbar className={clsx(classes.toolbar, className)} {...other}>
      {children}
    </Toolbar>
  );
};

export default PickerToolbar;

import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import { DIALOG_WIDTH } from '../constants/dimensions';

const useStyles = makeStyles(
  theme => ({
    staticWrapperRoot: {
      overflow: 'hidden',
      minWidth: DIALOG_WIDTH,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
    },
  }),
  { name: 'MuiPickersStaticWrapper' }
);

export const StaticWrapper: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.staticWrapperRoot} children={children} />;
};

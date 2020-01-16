import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DIALOG_WIDTH } from '../constants/dimensions';
import { WrapperVariantContext } from './WrapperVariantContext';

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

  return (
    <WrapperVariantContext.Provider value="static">
      <div className={classes.staticWrapperRoot} children={children} />
    </WrapperVariantContext.Provider>
  );
};

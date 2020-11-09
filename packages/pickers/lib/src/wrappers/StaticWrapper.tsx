import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DIALOG_WIDTH } from '../constants/dimensions';
import { WrapperVariantContext, IsStaticVariantContext } from './WrapperVariantContext';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      overflow: 'hidden',
      minWidth: DIALOG_WIDTH,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
    },
  }),
  { name: 'MuiPickersStaticWrapper' }
);

export interface StaticWrapperProps {
  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode
   *
   * @default "static"
   */
  displayStaticWrapperAs?: 'desktop' | 'mobile' | 'static';
}

export const StaticWrapper: React.FC<StaticWrapperProps> = (props) => {
  const { displayStaticWrapperAs = 'static', children } = props;
  const classes = useStyles();
  const isStatic = true;

  return (
    <IsStaticVariantContext.Provider value={isStatic}>
      <WrapperVariantContext.Provider value={displayStaticWrapperAs}>
        <div className={classes.root}>{children}</div>
      </WrapperVariantContext.Provider>
    </IsStaticVariantContext.Provider>
  );
};

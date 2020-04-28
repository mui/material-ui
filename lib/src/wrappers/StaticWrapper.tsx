import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DIALOG_WIDTH } from '../constants/dimensions';
import { WrapperVariantContext, IsStaticVariantContext } from './WrapperVariantContext';

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

export interface StaticWrapperProps {
  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode
   * @default "static"
   */
  displayStaticWrapperAs?: 'desktop' | 'mobile' | 'static';
}

export const StaticWrapper: React.FC<StaticWrapperProps> = ({
  displayStaticWrapperAs = 'static',
  children,
}) => {
  const classes = useStyles();

  return (
    <IsStaticVariantContext.Provider value={true}>
      <WrapperVariantContext.Provider value={displayStaticWrapperAs}>
        <div className={classes.staticWrapperRoot} children={children} />
      </WrapperVariantContext.Provider>
    </IsStaticVariantContext.Provider>
  );
};

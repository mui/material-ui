import * as React from 'react';
import { WithStyles, withStyles, MuiStyles, StyleRules } from '@material-ui/core/styles';
import { DIALOG_WIDTH } from '../constants/dimensions';
import { WrapperVariantContext, IsStaticVariantContext } from './WrapperVariantContext';
import { PrivateWrapperProps } from './WrapperProps';

type StaticWrapperClassKey = 'root';

const styles: MuiStyles<StaticWrapperClassKey> = (theme): StyleRules<StaticWrapperClassKey> => ({
  root: {
    overflow: 'hidden',
    minWidth: DIALOG_WIDTH,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  },
});

export interface StaticWrapperProps {
  children?: React.ReactNode;
  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode.
   * @default "static"
   */
  displayStaticWrapperAs?: 'desktop' | 'mobile';
}

const StaticWrapper: React.FC<
  PrivateWrapperProps & StaticWrapperProps & WithStyles<typeof styles>
> = (props) => {
  const { classes, displayStaticWrapperAs = 'mobile', children } = props;

  const isStatic = true;

  return (
    <IsStaticVariantContext.Provider value={isStatic}>
      <WrapperVariantContext.Provider value={displayStaticWrapperAs}>
        <div className={classes.root}>{children}</div>
      </WrapperVariantContext.Provider>
    </IsStaticVariantContext.Provider>
  );
};

export default withStyles(styles, { name: 'MuiPickersStaticWrapper' })(StaticWrapper) as React.FC<
  PrivateWrapperProps & StaticWrapperProps
>;

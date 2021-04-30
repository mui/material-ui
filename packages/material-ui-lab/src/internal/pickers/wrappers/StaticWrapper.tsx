import * as React from 'react';
import { WithStyles, withStyles, MuiStyles, StyleRules } from '@material-ui/core/styles';
import { DIALOG_WIDTH } from '../constants/dimensions';
import { WrapperVariantContext, IsStaticVariantContext } from './WrapperVariantContext';

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
   */
  displayStaticWrapperAs: 'desktop' | 'mobile';
}

function StaticWrapper(props: StaticWrapperProps & WithStyles<typeof styles>) {
  const { classes, displayStaticWrapperAs, children } = props;

  const isStatic = true;

  return (
    <IsStaticVariantContext.Provider value={isStatic}>
      <WrapperVariantContext.Provider value={displayStaticWrapperAs}>
        <div className={classes.root}>{children}</div>
      </WrapperVariantContext.Provider>
    </IsStaticVariantContext.Provider>
  );
}

export default withStyles(styles, { name: 'MuiPickersStaticWrapper' })(StaticWrapper);

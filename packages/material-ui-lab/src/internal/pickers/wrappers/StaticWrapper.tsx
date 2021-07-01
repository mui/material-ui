import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import { DIALOG_WIDTH } from '../constants/dimensions';
import { WrapperVariantContext, IsStaticVariantContext } from './WrapperVariantContext';

export interface StaticWrapperProps {
  children?: React.ReactNode;
  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode.
   */
  displayStaticWrapperAs: 'desktop' | 'mobile';
}

const StaticWrapperRoot = styled('div', { skipSx: true })(({ theme }) => ({
  overflow: 'hidden',
  minWidth: DIALOG_WIDTH,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
}));

function StaticWrapper(props: StaticWrapperProps) {
  const { displayStaticWrapperAs, children } = props;

  const isStatic = true;

  return (
    <IsStaticVariantContext.Provider value={isStatic}>
      <WrapperVariantContext.Provider value={displayStaticWrapperAs}>
        <StaticWrapperRoot>{children}</StaticWrapperRoot>
      </WrapperVariantContext.Provider>
    </IsStaticVariantContext.Provider>
  );
}

export default StaticWrapper;

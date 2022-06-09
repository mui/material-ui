import * as React from 'react';
import TabsUnstyled, { TabsUnstyledRootSlotProps } from '@mui/base/TabsUnstyled';

function Root(props: TabsUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-orientation={ownerState.orientation} {...other} />;
}

const styledTabs = <TabsUnstyled components={{ Root }} />;

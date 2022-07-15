import * as React from 'react';
import TabsListUnstyled, { TabsListUnstyledRootSlotProps } from '@mui/base/TabsListUnstyled';

function Root(props: TabsListUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-orientation={ownerState.orientation} {...other} />;
}

const styledTabsList = <TabsListUnstyled components={{ Root }} />;

import * as React from 'react';
import TabPanelUnstyled, { TabPanelUnstyledRootSlotProps } from '@mui/base/TabPanelUnstyled';

function Root(props: TabPanelUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-hidden={ownerState.hidden} {...other} />;
}

const styledTabPanel = <TabPanelUnstyled components={{ Root }} value={0} />;

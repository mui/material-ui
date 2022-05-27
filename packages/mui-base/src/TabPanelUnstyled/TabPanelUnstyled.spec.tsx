import * as React from 'react';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { TabPanelUnstyledRootSlotProps } from './TabPanelUnstyled.types';

function Root(props: TabPanelUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-hidden={ownerState.hidden} {...other} />;
}

const styledTabPanel = <TabPanelUnstyled components={{ Root }} value={0} />;

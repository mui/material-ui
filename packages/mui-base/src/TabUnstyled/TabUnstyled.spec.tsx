import * as React from 'react';
import TabUnstyled, { TabUnstyledRootSlotProps } from '@mui/base/TabUnstyled';

function Root(props: TabUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-active={ownerState.active} {...other} />;
}

const styledTab = <TabUnstyled components={{ Root }} />;

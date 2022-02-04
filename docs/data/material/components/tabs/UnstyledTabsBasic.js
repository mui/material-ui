import * as React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';

export default function UnstyledTabsBasic() {
  return (
    <TabsUnstyled defaultValue={0}>
      <TabsListUnstyled>
        <TabUnstyled>One</TabUnstyled>
        <TabUnstyled>Two</TabUnstyled>
        <TabUnstyled>Three</TabUnstyled>
      </TabsListUnstyled>
      <TabPanelUnstyled value={0}>First content</TabPanelUnstyled>
      <TabPanelUnstyled value={1}>Second content</TabPanelUnstyled>
      <TabPanelUnstyled value={2}>Third content</TabPanelUnstyled>
    </TabsUnstyled>
  );
}

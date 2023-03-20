import * as React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import styled from '@emotion/styled';

const TabsList = styled(TabsListUnstyled)(
  () => `
    display: flex;
    flex-direction: column;
    `,
);

export default function UnstyledTabsBasic() {
  return (
    <TabsUnstyled orientation="vertical" defaultValue={0}>
      <TabsList>
        <TabUnstyled>One</TabUnstyled>
        <TabUnstyled>Two</TabUnstyled>
        <TabUnstyled>Three</TabUnstyled>
      </TabsList>
      <TabPanelUnstyled value={0}>First page</TabPanelUnstyled>
      <TabPanelUnstyled value={1}>Second page</TabPanelUnstyled>
      <TabPanelUnstyled value={2}>Third page</TabPanelUnstyled>
    </TabsUnstyled>
  );
}

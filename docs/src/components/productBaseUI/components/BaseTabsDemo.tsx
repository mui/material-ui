import * as React from 'react';
import Box from '@mui/material/Box';
import TabsUnstyled from '@mui/base/Tabs';
import TabsListUnstyled from '@mui/base/TabsList';
import TabPanelUnstyled from '@mui/base/TabPanel';
import TabUnstyled from '@mui/base/Tab';
import { styled } from '@mui/system';

const StyledTabsList = styled('div')`
  min-width: 300px;
  background-color: var(--muidocs-palette-primary-main);
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: var(--muidocs-shadows-2);
`;
const StyledTabPanel = styled('div')`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;
const StyledTab = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:focus {
    color: #fff;
    outline: 3px solid var(--muidocs-palette-primary-200);
  }

  &.Mui-selected {
    background-color: #fff;
    color: var(--muidocs-palette-primary-main);
  }
`;

export default function BaseTabsDemo({ styling }: { styling?: 'system' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        height: '100%',
        py: 2,
      }}
    >
      <TabsUnstyled selectionFollowsFocus defaultValue={0}>
        <TabsListUnstyled slots={{ root: !styling ? undefined : StyledTabsList }}>
          <TabUnstyled slots={{ root: !styling ? undefined : StyledTab }}>One</TabUnstyled>
          <TabUnstyled slots={{ root: !styling ? undefined : StyledTab }}>Two</TabUnstyled>
          <TabUnstyled slots={{ root: !styling ? undefined : StyledTab }}>Three</TabUnstyled>
        </TabsListUnstyled>
        <TabPanelUnstyled slots={{ root: !styling ? undefined : StyledTabPanel }} value={0}>
          First page
        </TabPanelUnstyled>
        <TabPanelUnstyled slots={{ root: !styling ? undefined : StyledTabPanel }} value={1}>
          Second page
        </TabPanelUnstyled>
        <TabPanelUnstyled slots={{ root: !styling ? undefined : StyledTabPanel }} value={2}>
          Third page
        </TabPanelUnstyled>
      </TabsUnstyled>
    </Box>
  );
}
BaseTabsDemo.getCode = (styling?: 'system') => {
  if (styling === 'system') {
    return `import TabsUnstyled from '@mui/base/Tabs';
import TabsListUnstyled from '@mui/base/TabsList';
import TabPanelUnstyled from '@mui/base/TabPanel';
import TabUnstyled from '@mui/base/Tab';
import { styled } from '@mui/system';

const StyledTabsList = styled('div')\`
  // 🪄 styles here.
\`;
const StyledTabPanel = styled('div')\`
  // 🪄 styles here.
\`;
const StyledTab = styled('button')\`
  // 🪄 styles here.
\`;

<TabsUnstyled selectionFollowsFocus defaultValue={0}>
  <TabsListUnstyled slots={{ root: StyledTabsList }}>
    <TabUnstyled slots={{ root: StyledTab }}>One</TabUnstyled>
    <TabUnstyled slots={{ root: StyledTab }}>Two</TabUnstyled>
    <TabUnstyled slots={{ root: StyledTab }}>Three</TabUnstyled>
  </TabsListUnstyled>
  <TabPanelUnstyled slots={{ root: StyledTabPanel }} value={0}>
    First page
  </TabPanelUnstyled>
  <TabPanelUnstyled slots={{ root: StyledTabPanel }} value={1}>
    Second page
  </TabPanelUnstyled>
  <TabPanelUnstyled slots={{ root: StyledTabPanel }} value={2}>
    Third page
  </TabPanelUnstyled>
</TabsUnstyled>
`;
  }
  return `import TabsUnstyled from '@mui/base/Tabs';
import TabsListUnstyled from '@mui/base/TabsList';
import TabPanelUnstyled from '@mui/base/TabPanel';
import TabUnstyled from '@mui/base/Tab';

<TabsUnstyled selectionFollowsFocus defaultValue={0}>
  <TabsListUnstyled>
    <TabUnstyled>One</TabUnstyled>
    <TabUnstyled>Two</TabUnstyled>
    <TabUnstyled>Three</TabUnstyled>
  </TabsListUnstyled>
  <TabPanelUnstyled value={0}>First page</TabPanelUnstyled>
  <TabPanelUnstyled value={1}>Second page</TabPanelUnstyled>
  <TabPanelUnstyled value={2}>Third page</TabPanelUnstyled>
</TabsUnstyled>
`;
};

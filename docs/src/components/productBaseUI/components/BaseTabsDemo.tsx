import * as React from 'react';
import Box from '@mui/material/Box';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import { styled, GlobalStyles } from '@mui/system';

const tabListStyles = `
  min-width: 300px;
  background-color: var(--palette-primary);
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: var(--shadow);
`;

const StyledTabsList = styled('div')(tabListStyles);

const tabPanelStyles = `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;
const StyledTabPanel = styled('div')(tabPanelStyles);

const tabStyles = `
  font-family: 'IBM Plex Sans', sans-serif;
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

  &:hover {
    background-color: var(--palette-primary-light);
  }

  &:focus-visible {
    color: #FFF;
    outline: 3px solid var(--focus-ring);
  }

  &.Mui-selected {
    background-color: #FFF;
    color: var(--palette-primary);
  }
`;

const StyledTab = styled('button')(tabStyles);

const CSS = `.MuiTabsList-root {${tabListStyles}}

.MuiTabPanel-root {${tabPanelStyles}}

.MuiTab-root {${tabStyles}}`;

export default function BaseTabsDemo({ styling }: { styling: 'system' | 'tailwindcss' | 'css' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 144,
        gap: 2,
        py: 3,
      }}
    >
      {styling === 'system' && (
        <Tabs selectionFollowsFocus defaultValue={0}>
          <TabsList slots={{ root: StyledTabsList }}>
            <Tab slots={{ root: StyledTab }}>One</Tab>
            <Tab slots={{ root: StyledTab }}>Two</Tab>
            <Tab slots={{ root: StyledTab }}>Three</Tab>
          </TabsList>
          <TabPanel slots={{ root: StyledTabPanel }} value={0}>
            First page
          </TabPanel>
          <TabPanel slots={{ root: StyledTabPanel }} value={1}>
            Second page
          </TabPanel>
          <TabPanel slots={{ root: StyledTabPanel }} value={2}>
            Third page
          </TabPanel>
        </Tabs>
      )}
      {styling === 'css' && (
        <Tabs selectionFollowsFocus defaultValue={0}>
          <GlobalStyles styles={CSS} />
          <TabsList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabsList>
          <TabPanel value={0}>First page</TabPanel>
          <TabPanel value={1}>Second page</TabPanel>
          <TabPanel value={2}>Third page</TabPanel>
        </Tabs>
      )}
      {styling === 'tailwindcss' && ( // https://play.tailwindcss.com/8jGjUI7EWe
        <Tabs selectionFollowsFocus defaultValue={0}>
          <TabsList className="mb-[16px] flex min-w-[300px] content-between items-center justify-center rounded-[12px] bg-[--palette-primary] [box-shadow:var(--shadow)]">
            <Tab className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] hover:bg-[--palette-primary-light] focus:text-white focus-visible:[outline:3px_solid_var(--focus-ring)] ui-selected:bg-white ui-selected:text-[--palette-primary]">
              One
            </Tab>
            <Tab className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] hover:bg-[--palette-primary-light] focus:text-white focus-visible:[outline:3px_solid_var(--focus-ring)] ui-selected:bg-white ui-selected:text-[--palette-primary]">
              Two
            </Tab>
            <Tab className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] hover:bg-[--palette-primary-light] focus:text-white focus-visible:[outline:3px_solid_var(--focus-ring)] ui-selected:bg-white ui-selected:text-[--palette-primary]">
              Three
            </Tab>
          </TabsList>
          <TabPanel className="text-[0.875rem] [font-family:IBM_Plex_sans]" value={0}>
            First page
          </TabPanel>
          <TabPanel className="text-[0.875rem] [font-family:IBM_Plex_sans]" value={1}>
            Second page
          </TabPanel>
          <TabPanel className="text-[0.875rem] [font-family:IBM_Plex_sans]" value={2}>
            Third page
          </TabPanel>
        </Tabs>
      )}
    </Box>
  );
}
BaseTabsDemo.getCode = (styling: 'system' | 'tailwindcss' | 'css') => {
  if (styling === 'system') {
    return `import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import { styled } from '@mui/system';

const StyledTabsList = styled('div')\`${tabListStyles}\`;

const StyledTabPanel = styled('div')\`${tabPanelStyles}\`;

const StyledTab = styled('button')\`${tabStyles}\`;

<Tabs selectionFollowsFocus defaultValue={0}>
  <TabsList slots={{ root: StyledTabsList }}>
    <Tab slots={{ root: StyledTab }}>One</Tab>
    <Tab slots={{ root: StyledTab }}>Two</Tab>
    <Tab slots={{ root: StyledTab }}>Three</Tab>
  </TabsList>
  <TabPanel slots={{ root: StyledTabPanel }} value={0}>
    First page
  </TabPanel>
  <TabPanel slots={{ root: StyledTabPanel }} value={1}>
    Second page
  </TabPanel>
  <TabPanel slots={{ root: StyledTabPanel }} value={2}>
    Third page
  </TabPanel>
</Tabs>
`;
  }
  if (styling === 'tailwindcss') {
    return `import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';

<Tabs selectionFollowsFocus defaultValue={0}>
  <TabsList className="mb-[16px] flex min-w-[300px] content-between
            items-center justify-center rounded-[12px]
            bg-[--palette-primary] [box-shadow:var(--shadow)]">
    <Tab className="m-[6px] flex w-full cursor-pointer
        justify-center rounded-[7px] border-none
        bg-transparent p-[12px] text-[0.875rem]
        font-bold text-white [font-family:IBM_Plex_sans]
        focus:text-white
        focus:[outline:3px_solid_var(--focus-ring)]
        ui-selected:bg-white
        ui-selected:text-[--palette-primary]">
      One
    </Tab>
    <Tab className="m-[6px] flex w-full cursor-pointer
        justify-center rounded-[7px] border-none
        bg-transparent p-[12px] text-[0.875rem]
        font-bold text-white [font-family:IBM_Plex_sans]
        focus:text-white
        focus:[outline:3px_solid_var(--focus-ring)]
        ui-selected:bg-white
        ui-selected:text-[--palette-primary]">
      Two
    </Tab>
    <Tab className="m-[6px] flex w-full cursor-pointer
        justify-center rounded-[7px] border-none
        bg-transparent p-[12px] text-[0.875rem]
        font-bold text-white [font-family:IBM_Plex_sans]
        focus:text-white
        focus:[outline:3px_solid_var(--focus-ring)]
        ui-selected:bg-white
        ui-selected:text-[--palette-primary]">
      Three
    </Tab>
  </TabsList>
  <TabPanel
    className="text-[0.875rem] [font-family:IBM_Plex_sans]"
    value={0}>
    First page
  </TabPanel>
  <TabPanel
    className="text-[0.875rem] [font-family:IBM_Plex_sans]"
    value={1}>
    Second page
  </TabPanel>
  <TabPanel
    className="text-[0.875rem] [font-family:IBM_Plex_sans]"
    value={2}>
    Third page
  </TabPanel>
</Tabs>`;
  }
  if (styling === 'css') {
    return `import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import { styled } from '@mui/system';
import './styles.css';

<Tabs selectionFollowsFocus defaultValue={0}>
  <TabsList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
    <Tab>Three</Tab>
  </TabsList>
  <TabPanel value={0}>
    First page
  </TabPanel>
  <TabPanel value={1}>
    Second page
  </TabPanel>
  <TabPanel value={2}>
    Third page
  </TabPanel>
</Tabs>

/* styles.css */
${CSS}
`;
  }
  return '';
};

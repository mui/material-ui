import * as React from 'react';
import Box from '@mui/material/Box';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import { styled, GlobalStyles } from '@mui/system';

const tabListStyles = `
  min-width: 300px;
  background-color: var(--primary);
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
  transition: all 120ms ease;
  user-select: none;

  &:hover {
    background-color: var(--primary-hover);
  }

  &:focus-visible {
    color: #FFF;
    outline: 2px solid rgba(255,255,255,0.8);
    outline-offset: 2px;
  }

  &.base--selected {
    background-color: #FFF;
    color: var(--primary);
  }
`;

const StyledTab = styled('button')(tabStyles);

const CSS = `.base-TabsList-root {${tabListStyles}}

.base-TabPanel-root {${tabPanelStyles}}

.base-Tab-root {${tabStyles}}`;

const tabStylesTailwind = `m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] hover:bg-[--primary-hover] focus:text-white focus-visible:[outline:2px_solid_rgba(255,255,255,0.8)] outline-offset-2 ui-selected:bg-white ui-selected:text-[--primary] transition select-none`;

const tabPanelStylesTailwind = `text-[0.875rem] [font-family:IBM_Plex_sans]`;

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
          <TabsList className="mb-[16px] flex min-w-[300px] content-between items-center justify-center rounded-[12px] bg-[--primary] [box-shadow:var(--shadow)]">
            <Tab className={tabStylesTailwind}>One</Tab>
            <Tab className={tabStylesTailwind}>Two</Tab>
            <Tab className={tabStylesTailwind}>Three</Tab>
          </TabsList>
          <TabPanel className={tabPanelStylesTailwind} value={0}>
            First page
          </TabPanel>
          <TabPanel className={tabPanelStylesTailwind} value={1}>
            Second page
          </TabPanel>
          <TabPanel className={tabPanelStylesTailwind} value={2}>
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
        focus:text-white focus:[outline:3px_solid_var(--focus-ring)]
        ui-selected:bg-white ui-selected:text-[--palette-primary]
        transition select-none">
      One
    </Tab>
    <Tab className="m-[6px] flex w-full cursor-pointer
        justify-center rounded-[7px] border-none
        bg-transparent p-[12px] text-[0.875rem]
        font-bold text-white [font-family:IBM_Plex_sans]
        focus:text-white focus:[outline:3px_solid_var(--focus-ring)]
        ui-selected:bg-white ui-selected:text-[--palette-primary]
        transition select-none">
      Two
    </Tab>
    <Tab className="m-[6px] flex w-full cursor-pointer
        justify-center rounded-[7px] border-none
        bg-transparent p-[12px] text-[0.875rem]
        font-bold text-white [font-family:IBM_Plex_sans]
        focus:text-white focus:[outline:3px_solid_var(--focus-ring)]
        ui-selected:bg-white ui-selected:text-[--palette-primary]
        transition select-none">
      Three
    </Tab>
  </TabsList>
  <TabPanel
    className={tabPanelStylesTailwind}
    value={0}>
    First page
  </TabPanel>
  <TabPanel
    className={tabPanelStylesTailwind}
    value={1}>
    Second page
  </TabPanel>
  <TabPanel
    className={tabPanelStylesTailwind}
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

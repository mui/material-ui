import * as React from 'react';
import Box from '@mui/material/Box';
import TabsUnstyled from '@mui/base/Tabs';
import TabsListUnstyled from '@mui/base/TabsList';
import TabPanelUnstyled from '@mui/base/TabPanel';
import TabUnstyled from '@mui/base/Tab';
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
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;
const StyledTabPanel = styled('div')(tabPanelStyles);

const tabStyles = `
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
    outline: 3px solid var(--focus-ring);
  }

  &.Mui-selected {
    background-color: #fff;
    color: var(--palette-primary);
  }
`;
const StyledTab = styled('button')(tabStyles);

const CSS = `
.MuiTabsList-root{${tabListStyles}};

.MuiTabPanel-root{${tabPanelStyles}};

.MuiTab-root{${tabStyles}}`;

export default function BaseTabsDemo({ styling }: { styling: 'system' | 'tailwindcss' | 'css' }) {
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
      {styling === 'system' && (
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
      )}
      {styling === 'css' && (
        <TabsUnstyled selectionFollowsFocus defaultValue={0}>
          <GlobalStyles styles={CSS} />
          <TabsListUnstyled>
            <TabUnstyled>One</TabUnstyled>
            <TabUnstyled>Two</TabUnstyled>
            <TabUnstyled>Three</TabUnstyled>
          </TabsListUnstyled>
          <TabPanelUnstyled value={0}>First page</TabPanelUnstyled>
          <TabPanelUnstyled value={1}>Second page</TabPanelUnstyled>
          <TabPanelUnstyled value={2}>Third page</TabPanelUnstyled>
        </TabsUnstyled>
      )}
      {styling === 'tailwindcss' && ( // https://play.tailwindcss.com/8jGjUI7EWe
        <TabsUnstyled selectionFollowsFocus defaultValue={0}>
          <TabsListUnstyled className="mb-[16px] flex min-w-[300px] content-between items-center justify-center rounded-[12px] bg-[--palette-primary] [box-shadow:var(--shadow)]">
            <TabUnstyled className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] focus:text-white focus:[outline:3px_solid_var(--focus-ring)] ui-selected:bg-white ui-selected:text-[--palette-primary]">
              One
            </TabUnstyled>
            <TabUnstyled className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] focus:text-white focus:[outline:3px_solid_var(--focus-ring)] ui-selected:bg-white ui-selected:text-[--palette-primary]">
              Two
            </TabUnstyled>
            <TabUnstyled className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] focus:text-white focus:[outline:3px_solid_var(--focus-ring)] ui-selected:bg-white ui-selected:text-[--palette-primary]">
              Three
            </TabUnstyled>
          </TabsListUnstyled>
          <TabPanelUnstyled className="text-[0.875rem] [font-family:IBM_Plex_sans]" value={0}>
            First page
          </TabPanelUnstyled>
          <TabPanelUnstyled className="text-[0.875rem] [font-family:IBM_Plex_sans]" value={1}>
            Second page
          </TabPanelUnstyled>
          <TabPanelUnstyled className="text-[0.875rem] [font-family:IBM_Plex_sans]" value={2}>
            Third page
          </TabPanelUnstyled>
        </TabsUnstyled>
      )}
    </Box>
  );
}
BaseTabsDemo.getCode = (styling: 'system' | 'tailwindcss' | 'css') => {
  if (styling === 'system') {
    return `import TabsUnstyled from '@mui/base/Tabs';
import TabsListUnstyled from '@mui/base/TabsList';
import TabPanelUnstyled from '@mui/base/TabPanel';
import TabUnstyled from '@mui/base/Tab';
import { styled } from '@mui/system';

const StyledTabsList = styled('div')\`${tabListStyles}\`;
const StyledTabPanel = styled('div')\`${tabPanelStyles}\`;
const StyledTab = styled('button')\`/${tabStyles}\`;

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
  if (styling === 'tailwindcss') {
    return `import TabsUnstyled from '@mui/base/Tabs';
import TabsListUnstyled from '@mui/base/TabsList';
import TabPanelUnstyled from '@mui/base/TabPanel';
import TabUnstyled from '@mui/base/Tab';

<TabsUnstyled selectionFollowsFocus defaultValue={0}>
  <TabsListUnstyled className="mb-[16px] flex min-w-[300px] content-between items-center justify-center rounded-[12px] bg-[--palette-primary] [box-shadow:var(--shadow)]">
    <TabUnstyled className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] focus:text-white focus:[outline:3px_solid_var(--focus-ring)] ui-selected:bg-white ui-selected:text-[--palette-primary]">
      One
    </TabUnstyled>
    <TabUnstyled className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] focus:text-white focus:[outline:3px_solid_var(--focus-ring)] ui-selected:bg-white ui-selected:text-[--palette-primary]">
      Two
    </TabUnstyled>
    <TabUnstyled className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] focus:text-white focus:[outline:3px_solid_var(--focus-ring)] ui-selected:bg-white ui-selected:text-[--palette-primary]">
      Three
    </TabUnstyled>
  </TabsListUnstyled>
  <TabPanelUnstyled className="text-[0.875rem] [font-family:IBM_Plex_sans]" value={0}>
    First page
  </TabPanelUnstyled>
  <TabPanelUnstyled className="text-[0.875rem] [font-family:IBM_Plex_sans]" value={1}>
    Second page
  </TabPanelUnstyled>
  <TabPanelUnstyled className="text-[0.875rem] [font-family:IBM_Plex_sans]" value={2}>
    Third page
  </TabPanelUnstyled>
</TabsUnstyled>`;
  }
  if (styling === 'css') {
    return `import TabsUnstyled from '@mui/base/Tabs';
import TabsListUnstyled from '@mui/base/TabsList';
import TabPanelUnstyled from '@mui/base/TabPanel';
import TabUnstyled from '@mui/base/Tab';
import { styled } from '@mui/system';
import './styles.css';

<TabsUnstyled selectionFollowsFocus defaultValue={0}>
  <TabsListUnstyled>
    <TabUnstyled>One</TabUnstyled>
    <TabUnstyled>Two</TabUnstyled>
    <TabUnstyled>Three</TabUnstyled>
  </TabsListUnstyled>
  <TabPanelUnstyled value={0}>
    First page
  </TabPanelUnstyled>
  <TabPanelUnstyled value={1}>
    Second page
  </TabPanelUnstyled>
  <TabPanelUnstyled value={2}>
    Third page
  </TabPanelUnstyled>
</TabsUnstyled>

/* styles.css */
${CSS}
    `;
  }
  return '';
};

import * as React from 'react';
import { styled } from '@mui/system';
import Tabs from '@mui/core/TabsUnstyled';
import TabsList from '@mui/core/TabsListUnstyled';
import TabPanelUnstyled from '@mui/core/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/core/TabUnstyled';

const Tab = styled(TabUnstyled)`
  padding: 15px 20px;
  color: #004386;
  background: #fff;
  font-weight: 600;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  transition: border 100ms ease;
  cursor: pointer;
  border: none;
  margin: 3px;

  &:hover {
    border-bottom: 2px solid #006ad4;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${tabUnstyledClasses.selected} {
    border-bottom: 2px solid #004386;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
`;

export default function Example() {
  return (
    <Tabs defaultValue={0}>
      <div>
        <TabsList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabsList>
      </div>
      <TabPanel value={0}>First content</TabPanel>
      <TabPanel value={1}>Second content</TabPanel>
      <TabPanel value={2}>Third content</TabPanel>
    </Tabs>
  );
}

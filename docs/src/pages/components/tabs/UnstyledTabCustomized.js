import * as React from 'react';
import { styled } from '@mui/system';
import Tabs from '@mui/core/TabsUnstyled';
import TabsList from '@mui/core/TabsListUnstyled';
import TabPanelUnstyled from '@mui/core/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/core/TabUnstyled';

const Tab = styled(TabUnstyled)`
  background-color: #007fff;
  padding: 15px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color: #0059b2;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #004386;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #004386;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  border: 2px solid grey;
  border-radius: 10px;
  float: left;
  clear: both;
`;

export default function Example() {
  return (
    <Tabs>
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

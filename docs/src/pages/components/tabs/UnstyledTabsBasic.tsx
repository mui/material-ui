import * as React from 'react';
import Tabs from '@mui/core/TabsUnstyled';
import TabsList from '@mui/core/TabsListUnstyled';
import TabPanel from '@mui/core/TabPanelUnstyled';
import Tab from '@mui/core/TabUnstyled';

export default function Example() {
  return (
    <Tabs defaultValue={0}>
      <TabsList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabsList>
      <TabPanel value={0}>First content</TabPanel>
      <TabPanel value={1}>Second content</TabPanel>
      <TabPanel value={2}>Third content</TabPanel>
    </Tabs>
  );
}

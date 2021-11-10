import * as React from 'react';
import Tabs from '@mui/base/TabsUnstyled';
import TabsList from '@mui/base/TabsListUnstyled';
import TabPanel from '@mui/base/TabPanelUnstyled';
import Tab from '@mui/base/TabUnstyled';

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

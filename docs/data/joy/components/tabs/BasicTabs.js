import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

export default function BasicTabs() {
  return (
    <Tabs>
      <TabList>
        <Tab>First tab</Tab>
        <Tab>Second tab</Tab>
        <Tab>Third tab</Tab>
      </TabList>
      <TabPanel value={0}>
        <b>First</b> tab&apos;s content
      </TabPanel>
      <TabPanel value={1}>
        <b>Second</b> tab&apos;s content
      </TabPanel>
      <TabPanel value={2}>
        <b>Third</b> tab&apos;s content
      </TabPanel>
    </Tabs>
  );
}

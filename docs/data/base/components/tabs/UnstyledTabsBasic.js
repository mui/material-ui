import * as React from 'react';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';

export default function UnstyledTabsBasic() {
  return (
    <Tabs defaultValue={1}>
      <TabsList>
        <Tab value={1}>One</Tab>
        <Tab value={2}>Two</Tab>
        <Tab value={3}>Three</Tab>
      </TabsList>
      <TabPanel value={1}>First page</TabPanel>
      <TabPanel value={2}>Second page</TabPanel>
      <TabPanel value={3}>Third page</TabPanel>
    </Tabs>
  );
}

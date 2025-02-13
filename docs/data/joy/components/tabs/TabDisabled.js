import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';

export default function TabDisabled() {
  return (
    <Tabs aria-label="Disabled tabs" defaultValue={0}>
      <TabList>
        <Tab>First tab</Tab>
        <Tab disabled>Second tab</Tab>
        <Tab>Third tab</Tab>
      </TabList>
    </Tabs>
  );
}

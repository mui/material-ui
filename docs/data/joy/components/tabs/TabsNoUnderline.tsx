import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

export default function TabsNoUnderline() {
  return (
    <Tabs aria-label="Basic tabs" defaultValue={0}>
      <TabList disableUnderline sx={{ mb: 2 }}>
        <Tab>First tab</Tab>
        <Tab>Second tab</Tab>
        <Tab>Third tab</Tab>
      </TabList>
      <TabPanel value={0} variant="outlined">
        <b>First</b> tab panel
      </TabPanel>
      <TabPanel value={1} variant="outlined">
        <b>Second</b> tab panel
      </TabPanel>
      <TabPanel value={2} variant="outlined">
        <b>Third</b> tab panel
      </TabPanel>
    </Tabs>
  );
}

import * as React from 'react';
import ScrollableTabs from '@mui/joy/ScrollableTabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

export default function TabsBasic() {
  return (
    <ScrollableTabs
      aria-label="Basic tabs"
      defaultValue={0}
      sx={{ borderRadius: 'lg', width: '300px' }}
    >
      <TabList>
        <Tab>First tab</Tab>
        <Tab>Second tab</Tab>
        <Tab>Third tab</Tab>
        <Tab>Fourth tab</Tab>
        <Tab>Fifth tab</Tab>
        <Tab>Sixth tab</Tab>
      </TabList>
      <TabPanel value={0} sx={{ p: 2 }}>
        <b>First</b> tab panel
      </TabPanel>
      <TabPanel value={1} sx={{ p: 2 }}>
        <b>Second</b> tab panel
      </TabPanel>
      <TabPanel value={2} sx={{ p: 2 }}>
        <b>Third</b> tab panel
      </TabPanel>
      <TabPanel value={3} sx={{ p: 2 }}>
        <b>Fourth</b> tab panel
      </TabPanel>
      <TabPanel value={4} sx={{ p: 2 }}>
        <b>Fifth</b> tab panel
      </TabPanel>
      <TabPanel value={5} sx={{ p: 2 }}>
        <b>Sixth</b> tab panel
      </TabPanel>
    </ScrollableTabs>
  );
}

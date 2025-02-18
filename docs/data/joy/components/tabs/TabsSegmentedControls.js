import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';

export default function TabsSegmentedControls() {
  return (
    <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }}>
      <TabList
        disableUnderline
        sx={{
          p: 0.5,
          gap: 0.5,
          borderRadius: 'xl',
          bgcolor: 'background.level1',
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: 'sm',
            bgcolor: 'background.surface',
          },
        }}
      >
        <Tab disableIndicator>Feature</Tab>
        <Tab disableIndicator>Specifications</Tab>
        <Tab disableIndicator>Review</Tab>
        <Tab disableIndicator>Support</Tab>
      </TabList>
    </Tabs>
  );
}

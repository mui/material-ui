import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';

export default function TabsUnderlineExample() {
  return (
    <Tabs aria-label="tabs" defaultValue={0}>
      <TabList
        disableUnderline
        variant="soft"
        sx={{
          '--List-padding': '4px',
          '--List-radius': '16px',
          '--Tab-lineThickness': 0,
          [`& .${tabClasses.selected}`]: {
            boxShadow: 'sm',
            bgcolor: 'background.surface',
            color: 'text.primary',
          },
        }}
      >
        <Tab>Feature</Tab>
        <Tab>Specifications</Tab>
        <Tab>Review</Tab>
        <Tab>Support</Tab>
      </TabList>
    </Tabs>
  );
}

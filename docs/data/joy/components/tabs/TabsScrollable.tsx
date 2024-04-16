import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';

export default function TabsScrollable() {
  return (
    <Tabs aria-label="Scrollable tabs" defaultValue={0} sx={{ width: 400 }}>
      <TabList
        sx={{
          overflow: 'auto',
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {[...Array(20)].map((_, index) => (
          <Tab key={index} sx={{ flex: 'none', scrollSnapAlign: 'start' }}>
            Tab #{index + 1}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}

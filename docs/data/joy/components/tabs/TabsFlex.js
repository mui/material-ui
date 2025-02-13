import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import Stack from '@mui/joy/Stack';

export default function TabsFlex() {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Tabs aria-label="Flex one tabs">
        <TabList tabFlex={1}>
          <Tab>First tab</Tab>
          <Tab sx={{ wordBreak: 'break-word' }}>
            Example of a very long tab label
          </Tab>
          <Tab>Third tab</Tab>
        </TabList>
      </Tabs>

      <Tabs aria-label="Flex auto tabs">
        <TabList tabFlex="auto">
          <Tab>First tab</Tab>
          <Tab>Example of a very long tab label</Tab>
          <Tab>Third tab</Tab>
        </TabList>
      </Tabs>
    </Stack>
  );
}

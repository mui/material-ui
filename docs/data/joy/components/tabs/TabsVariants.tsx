import * as React from 'react';
import Box from '@mui/joy/Box';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';

export default function TabsVariants() {
  const [index, setIndex] = React.useState(0);
  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Tabs
        aria-label="Plain tabs"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
      >
        <TabList variant="plain">
          <Tab variant={index === 0 ? 'outlined' : 'plain'}>First tab</Tab>
          <Tab variant={index === 1 ? 'outlined' : 'plain'}>Second tab</Tab>
          <Tab variant={index === 2 ? 'outlined' : 'plain'}>Third tab</Tab>
        </TabList>
      </Tabs>

      <Tabs
        aria-label="Outlined tabs"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
      >
        <TabList variant="outlined" disableUnderline>
          <Tab
            variant={index === 0 ? 'soft' : 'plain'}
            color={index === 0 ? 'success' : 'neutral'}
          >
            First tab
          </Tab>
          <Tab
            variant={index === 1 ? 'soft' : 'plain'}
            color={index === 1 ? 'warning' : 'neutral'}
          >
            Second tab
          </Tab>
          <Tab
            variant={index === 2 ? 'soft' : 'plain'}
            color={index === 2 ? 'danger' : 'neutral'}
          >
            Third tab
          </Tab>
        </TabList>
      </Tabs>

      <Tabs
        aria-label="Soft tabs"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
      >
        <TabList variant="soft">
          <Tab
            variant={index === 0 ? 'solid' : 'plain'}
            color={index === 0 ? 'primary' : 'neutral'}
          >
            First tab
          </Tab>
          <Tab
            variant={index === 1 ? 'solid' : 'plain'}
            color={index === 1 ? 'primary' : 'neutral'}
          >
            Second tab
          </Tab>
          <Tab
            variant={index === 2 ? 'solid' : 'plain'}
            color={index === 2 ? 'primary' : 'neutral'}
          >
            Third tab
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}

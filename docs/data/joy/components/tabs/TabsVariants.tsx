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
        <TabList
          variant="plain"
          sx={{
            '& > button:not([aria-selected="true"])': {
              borderColor: 'transparent',
            },
          }}
        >
          <Tab variant="outlined">First tab</Tab>
          <Tab variant="outlined">Second tab</Tab>
          <Tab variant="outlined">Third tab</Tab>
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
            color={index === 0 ? 'primary' : 'neutral'}
          >
            First tab
          </Tab>
          <Tab
            variant={index === 1 ? 'soft' : 'plain'}
            color={index === 1 ? 'info' : 'neutral'}
          >
            Second tab
          </Tab>
          <Tab
            variant={index === 2 ? 'soft' : 'plain'}
            color={index === 2 ? 'warning' : 'neutral'}
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
        <TabList>
          <Tab variant="solid" color="primary">
            First tab
          </Tab>
          <Tab variant="solid" color="primary">
            Second tab
          </Tab>
          <Tab variant="solid" color="primary">
            Third tab
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}

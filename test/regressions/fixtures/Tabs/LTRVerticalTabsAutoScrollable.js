import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function LTRVerticalTabsAutoScrollable() {
  return (
    <Box sx={{ height: 200, display: 'flex' }}>
      <Tabs value={4} variant="scrollable" scrollButtons="auto" orientation="vertical">
        <Tab label="Tab A" />
        <Tab label="Tab B" />
        <Tab label="Tab C" />
        <Tab label="Tab D" />
        <Tab label="Tab E" />
        <Tab label="Tab F" />
        <Tab label="Tab G" />
      </Tabs>
    </Box>
  );
}

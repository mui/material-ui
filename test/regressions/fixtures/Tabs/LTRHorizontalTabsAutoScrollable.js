import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function LTRHorizontalTabsAutoScrollable() {
  return (
    <Box sx={{ width: 300, display: 'flex' }}>
      <Tabs value={4} variant="scrollable" scrollButtons="auto" orientation="horizontal">
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

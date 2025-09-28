import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function LTRHorizontalTabsAutoScrollable() {
  const [value, setValue] = React.useState(4);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: 300, display: 'flex' }}>
      <Tabs
        value={value}
        variant="scrollable"
        scrollButtons="auto"
        orientation="horizontal"
        onChange={handleChange}
        aria-label="scrollable auto tabs example"
      >
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

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const listSx = { borderBottom: 1, borderColor: 'divider' };

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab tabs" sx={listSx}>
          <Tab label="Item One" value="1" />
          <Tab label="Item Two" value="2" />
          <Tab label="Item Three" value="3" />
        </TabList>
        <TabPanel value="1" tabIndex={0}>
          Item One
        </TabPanel>
        <TabPanel value="2" tabIndex={0}>
          Item Two
        </TabPanel>
        <TabPanel value="3" tabIndex={0}>
          Item Three
        </TabPanel>
      </TabContext>
    </Box>
  );
}

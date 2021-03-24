import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function DividerWrapper() {
  return <Divider orientation="vertical" variant="middle" flexItem />;
}

export default function VerticalDividerMiddle() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Item One" {...a11yProps(0)} />
        <DividerWrapper />
        <Tab label="Item Two" {...a11yProps(0)} />
      </Tabs>
    </Box>
  );
}

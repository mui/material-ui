import * as React from 'react';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function HoverTabs() {
  const [value, setValue] = React.useState<false | number>(false);

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Tabs value={value} onMouseLeave={() => setValue(false)}>
        <Tab label="Item One" onMouseEnter={() => setValue(0)} />
        <Tab label="Item Two" onMouseEnter={() => setValue(1)} />
        <Tab label="Item Three" onMouseEnter={() => setValue(2)} />
      </Tabs>
    </Box>
  );
}

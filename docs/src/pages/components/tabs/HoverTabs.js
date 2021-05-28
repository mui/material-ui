import * as React from 'react';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function CenteredTabs() {
  const [value, setValue] = React.useState(false);

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} centered onMouseLeave={() => setValue(false)}>
        <Tab label="Item One" onMouseOver={() => setValue(0)} />
        <Tab label="Item Two" onMouseOver={() => setValue(1)} />
        <Tab label="Item Three" onMouseOver={() => setValue(2)} />
      </Tabs>
    </Box>
  );
}

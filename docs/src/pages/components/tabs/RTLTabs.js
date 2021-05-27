import * as React from 'react';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function RTLTabs() {
  const [selected, setSelected] = React.useState(0);
  return (
    <ThemeProvider theme={createTheme({ direction: 'rtl' })}>
      <Box
        dir="rtl"
        sx={{ flexGrow: 1, width: '100%', bgcolor: 'background.paper' }}
      >
        <Tabs value={selected} onMouseLeave={() => setSelected(false)}>
          <Tab label="First Item" onMouseOver={() => setSelected(0)} />
          <Tab label="Second Item" onMouseOver={() => setSelected(1)} />
          <Tab label="Third Item" onMouseOver={() => setSelected(2)} />
        </Tabs>
      </Box>
    </ThemeProvider>
  );
}

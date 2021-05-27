import * as React from 'react';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function Page() {
  const [selected, setSelected] = React.useState(false);
  return (
    <ThemeProvider theme={createTheme({ direction: 'rtl' })}>
      <div dir="rtl">
        <Tabs value={selected} variant="scrollable" scrollButtons>
          <Tab label="First Item" onMouseOver={() => setSelected(0)} />
          <Tab label="Second Item" onMouseOver={() => setSelected(1)} />
          <Tab label="Third Item" onMouseOver={() => setSelected(2)} />
          <Tab label="Fourth Item" onMouseOver={() => setSelected(3)} />
          <Tab label="Fifth Item" onMouseOver={() => setSelected(4)} />
          <Tab label="Sixth Item" onMouseOver={() => setSelected(5)} />
        </Tabs>
      </div>
    </ThemeProvider>
  );
}

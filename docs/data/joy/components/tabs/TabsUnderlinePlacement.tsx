import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

export default function TabsUnderlinePlacement() {
  const [placement, setPlacement] = React.useState<
    'top' | 'bottom' | 'left' | 'right'
  >('top');
  return (
    <Tabs
      variant="plain"
      aria-label="Placement indicator tabs"
      value={placement}
      onChange={(event, newValue) => setPlacement(newValue as typeof placement)}
    >
      <TabList underlinePlacement={placement}>
        <Tab disableIndicator value="top">
          Top
        </Tab>
        <Tab disableIndicator value="right">
          Right
        </Tab>
        <Tab disableIndicator value="bottom">
          Bottom
        </Tab>
        <Tab disableIndicator value="left">
          Left
        </Tab>
      </TabList>
      <TabPanel value="top">
        underlinePlacement <b>Top</b>
      </TabPanel>
      <TabPanel value="bottom">
        underlinePlacement <b>Bottom</b>
      </TabPanel>
      <TabPanel value="left">
        underlinePlacement <b>Left</b>
      </TabPanel>
      <TabPanel value="right">
        underlinePlacement <b>Right</b>
      </TabPanel>
    </Tabs>
  );
}

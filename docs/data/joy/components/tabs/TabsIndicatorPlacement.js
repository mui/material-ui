import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

export default function TabsIndicatorPlacement() {
  return (
    <Tabs defaultValue="top">
      <TabList underlinePlacement="bottom">
        <Tab value="top" indicatorPlacement="top">
          Top
        </Tab>
        <Tab value="right" indicatorPlacement="right">
          Right
        </Tab>
        <Tab value="bottom" indicatorPlacement="bottom">
          Bottom
        </Tab>
        <Tab value="left" indicatorPlacement="left">
          Left
        </Tab>
      </TabList>
      <TabPanel value="top">
        IndicatorPlacement <b>Top</b>
      </TabPanel>
      <TabPanel value="right">
        IndicatorPlacement <b>Right</b>
      </TabPanel>
      <TabPanel value="bottom">
        IndicatorPlacement <b>Bottom</b>
      </TabPanel>
      <TabPanel value="left">
        IndicatorPlacement <b>Left</b>
      </TabPanel>
    </Tabs>
  );
}

import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

export default function TabsIndicatorPlacement() {
  const [placement, setPlacement] = React.useState('top');
  return (
    <Tabs
      variant="outlined"
      orientation={placement.match(/(left|right)/) ? 'vertical' : 'horizontal'}
      aria-label="Placement indicator tabs"
      value={placement}
      onChange={(event, newValue) => setPlacement(newValue)}
      sx={{
        width: 300,
        height: 180,
        flexDirection: {
          top: 'column-reverse',
          bottom: 'column',
          left: 'row-reverse',
          right: 'row',
        }[placement],
      }}
    >
      <TabList sticky underlinePlacement={placement}>
        <Tab indicatorPlacement={placement} value="bottom">
          Bottom
        </Tab>
        <Tab indicatorPlacement={placement} value="top">
          Top
        </Tab>
        <Tab indicatorPlacement={placement} value="left">
          Left
        </Tab>
        <Tab indicatorPlacement={placement} value="right">
          Right
        </Tab>
      </TabList>
      <TabPanel value="top">Top panel</TabPanel>
      <TabPanel value="bottom">Bottom panel</TabPanel>
      <TabPanel value="left">Left panel</TabPanel>
      <TabPanel value="right">Right panel</TabPanel>
    </Tabs>
  );
}

import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

export default function TabsFlexPlacement() {
  const [direction, setDirection] = React.useState<
    'row' | 'column' | 'row-reverse' | 'column-reverse'
  >('column');
  const [placement, setPlacement] = React.useState<
    'top' | 'bottom' | 'left' | 'right'
  >('bottom');
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '180px 140px', gap: 1.5 }}>
      <FormControl>
        <FormLabel>Flex direction</FormLabel>
        <Select
          value={direction}
          onChange={(event, newValue) => setDirection(newValue!)}
        >
          <Option value="column">Column</Option>
          <Option value="column-reverse">Column Reverse</Option>
          <Option value="row">Row</Option>
          <Option value="row-reverse">Row Reverse</Option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Placement</FormLabel>
        <Select
          value={placement}
          onChange={(event, newValue) => setPlacement(newValue!)}
        >
          <Option value="top">top</Option>
          <Option value="bottom">bottom</Option>
          <Option value="left">left</Option>
          <Option value="right">right</Option>
        </Select>
      </FormControl>
      <Tabs
        variant="outlined"
        orientation={direction.startsWith('row') ? 'vertical' : 'horizontal'}
        aria-label="Placement indicator tabs"
        defaultValue="a"
        sx={{ gridColumn: '1/-1', height: 180, flexDirection: direction }}
      >
        <TabList underlinePlacement={placement}>
          <Tab indicatorPlacement={placement} value="a">
            Tab A
          </Tab>
          <Tab indicatorPlacement={placement} value="b">
            Tab B
          </Tab>
          <Tab indicatorPlacement={placement} value="c">
            Tab C
          </Tab>
        </TabList>
        <TabPanel value="a">Content of Tab A</TabPanel>
        <TabPanel value="b">Content of Tab B</TabPanel>
        <TabPanel value="c">Content of Tab C</TabPanel>
      </Tabs>
    </Box>
  );
}

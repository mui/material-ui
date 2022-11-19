import * as React from 'react';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

export default function ListVariables() {
  return (
    <JoyVariablesDemo
      componentName="Tabs"
      childrenAccepted
      data={[
        {
          var: '--Tabs-gap',
          defaultValue: '4px',
          helperText: "Controls TabList's gap and TabPanel's padding.",
        },
      ]}
      renderDemo={(sx) => (
        <Tabs sx={sx} defaultValue={0}>
          <TabList>
            <Tab>Tab A</Tab>
            <Tab>Tab B</Tab>
            <Tab>Tab C</Tab>
          </TabList>
          <TabPanel value={0}>Tab A content</TabPanel>
          <TabPanel value={1}>Tab B content</TabPanel>
          <TabPanel value={2}>Tab C content</TabPanel>
        </Tabs>
      )}
    />
  );
}

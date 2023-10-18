import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function TabsVariables() {
  return (
    <JoyVariablesDemo
      componentName="Tabs"
      childrenAccepted
      data={[
        {
          var: '--Tabs-spacing',
          defaultValue: '16px',
          helperText: "Controls TabList's gap and TabPanel's padding.",
        },
        {
          var: '--Tab-indicatorThickness',
          defaultValue: '2px',
        },
        {
          var: '--Tab-indicatorSize',
          defaultValue: '0px',
        },
        {
          var: '--Tab-indicatorRadius',
          defaultValue: '0px',
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

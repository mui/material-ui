import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

export default function TabsUsage() {
  const [index, setIndex] = React.useState(0);
  return (
    <JoyUsageDemo
      componentName="Tabs"
      data={[
        {
          formLabel: 'Selected tab variant',
          propName: 'variant',
          knob: 'select',
          defaultValue: 'plain',
          options: ['plain', 'outlined', 'soft', 'solid'],
          codeBlockDisplay: false,
        },
        {
          formLabel: 'Selected tab color',
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
          codeBlockDisplay: false,
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'children',
          defaultValue: '$children',
        },
      ]}
      getCodeBlock={(code, props) =>
        code.replace(
          '$children',
          `<TabList${props.variant ? ` variant="${props.variant}"` : ''}${
            props.color ? ` color="${props.color}"` : ''
          }>
    <Tab>...</Tab>
  </TabList>`,
        )
      }
      renderDemo={({ size, color, variant }) => (
        <Tabs size={size} value={index} onChange={(event, value) => setIndex(value)}>
          <TabList>
            <Tab {...(index === 0 && { color, variant })}>Tab A</Tab>
            <Tab {...(index === 1 && { color, variant })}>Tab B</Tab>
            <Tab {...(index === 2 && { color, variant })}>Tab C</Tab>
          </TabList>
          <TabPanel value={0}>Content of Tab A</TabPanel>
          <TabPanel value={1}>Content of Tab B</TabPanel>
          <TabPanel value={2}>Content of Tab C</TabPanel>
        </Tabs>
      )}
    />
  );
}

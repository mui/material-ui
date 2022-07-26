import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';

export default function TabsUsage() {
  return (
    <JoyUsageDemo
      componentName="Tabs"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'soft',
          options: ['plain', 'outlined', 'soft', 'solid'],
          codeBlockDisplay: false,
        },
        {
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
      renderDemo={({ size, ...props }) => (
        <Tabs size={size} defaultValue={1}>
          <TabList {...props}>
            <Tab value={1}>Tab A</Tab>
            <Tab value={2}>Tab B</Tab>
            <Tab value={3}>Tab C</Tab>
          </TabList>
        </Tabs>
      )}
    />
  );
}

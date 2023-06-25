import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';

export default function TabsUsage() {
  const [index, setIndex] = React.useState(0);
  return (
    <JoyUsageDemo
      componentName="Tabs"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'plain',
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
          `<TabList>
    <Tab${props.variant ? ` variant="${props.variant}"` : ''}${
            props.color ? ` color="${props.color}"` : ''
          }>...</Tab>
  </TabList>`,
        )
      }
      renderDemo={({ size, variant, color, ...props }) => (
        <Tabs size={size} value={index} onChange={(event, value) => setIndex(value)}>
          <TabList {...props}>
            <Tab
              variant={index === 0 ? variant : 'plain'}
              color={index === 0 ? color : 'neutral'}
            >
              Tab A
            </Tab>
            <Tab
              variant={index === 1 ? variant : 'plain'}
              color={index === 1 ? color : 'neutral'}
            >
              Tab B
            </Tab>
            <Tab
              variant={index === 2 ? variant : 'plain'}
              color={index === 2 ? color : 'neutral'}
            >
              Tab C
            </Tab>
          </TabList>
        </Tabs>
      )}
    />
  );
}

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
          defaultValue: 'outlined',
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
        <Tabs
          size={size}
          value={index}
          onChange={(event, value) => setIndex(value)}
          sx={{ borderRadius: 'lg' }}
        >
          <TabList {...props}>
            <Tab
              variant={index === 0 ? 'soft' : 'plain'}
              color={index === 0 ? 'primary' : 'neutral'}
            >
              Tab A
            </Tab>
            <Tab
              variant={index === 1 ? 'soft' : 'plain'}
              color={index === 1 ? 'primary' : 'neutral'}
            >
              Tab B
            </Tab>
            <Tab
              variant={index === 2 ? 'soft' : 'plain'}
              color={index === 2 ? 'primary' : 'neutral'}
            >
              Tab C
            </Tab>
          </TabList>
        </Tabs>
      )}
    />
  );
}

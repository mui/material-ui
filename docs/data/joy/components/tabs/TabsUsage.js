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
          propName: 'variant',
          formLabel: 'Tab variant',
          knob: 'select',
          defaultValue: 'plain',
          options: ['plain', 'outlined', 'soft', 'solid'],
          codeBlockDisplay: false,
        },
        {
          propName: 'color',
          formLabel: 'Selected tab color',
          knob: 'color',
          defaultValue: 'primary',
          codeBlockDisplay: false,
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'orientation',
          knob: 'radio',
          options: ['horizontal', 'vertical'],
          defaultValue: 'horizontal',
        },
        {
          propName: 'flip',
          knob: 'switch',
          defaultValue: false,
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
    <Tab
      ${props.variant ? `variant="${props.variant}"` : ''}${
            props.color
              ? `
      color={selected ? "${props.color}" : "neutral"}`
              : ''
          }>
      ...
    </Tab>
  </TabList>
  <TabPanel>...</TabPanel>`,
        )
      }
      renderDemo={({ variant, color, ...props }) => (
        <Tabs
          aria-label="Tabs demo"
          {...props}
          value={index}
          onChange={(event, value) => setIndex(value)}
          sx={{
            borderRadius: 'sm',
            border: '3px solid',
            borderColor: 'background.level2',
            position: 'relative',
            overflow: 'hidden',
            mb: 2,
            minWidth: 256,
          }}
        >
          <TabList>
            <Tab variant={variant} color={index === 0 ? color : 'neutral'} value={0}>
              Recents
            </Tab>
            <Tab variant={variant} color={index === 1 ? color : 'neutral'} value={1}>
              Favorite
            </Tab>
            <Tab variant={variant} color={index === 2 ? color : 'neutral'} value={2}>
              Nearby
            </Tab>
          </TabList>
          <TabPanel value={0}>Recents tab</TabPanel>
          <TabPanel value={1}>Favorite tab</TabPanel>
          <TabPanel value={2}>Nearby tab</TabPanel>
        </Tabs>
      )}
    />
  );
}

import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Apps from '@mui/icons-material/Apps';

export default function TabsUsage() {
  const [index, setIndex] = React.useState(0);
  return (
    <JoyUsageDemo
      componentName="Tabs"
      data={[
        {
          formLabel: 'Selected tab variant',
          propName: 'variant',
          knob: 'radio',
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
          propName: 'orientation',
          knob: 'radio',
          options: ['horizontal', 'vertical'],
          defaultValue: 'horizontal',
        },
        {
          formLabel: 'Disable TabList underline',
          propName: 'disableUnderline',
          knob: 'switch',
          defaultValue: false,
          codeBlockDisplay: false,
        },
        {
          formLabel: 'Tab indicator inset',
          propName: 'indicatorInset',
          knob: 'switch',
          defaultValue: false,
          codeBlockDisplay: false,
        },
        {
          formLabel: 'Disable Tab indicator',
          propName: 'disableIndicator',
          knob: 'switch',
          defaultValue: false,
          codeBlockDisplay: false,
        },
        {
          propName: 'children',
          defaultValue: '$children',
        },
      ]}
      getCodeBlock={(code, props) =>
        code.replace(
          '$children',
          `<TabList${props.disableUnderline ? ` disableUnderline` : ''}>
    <Tab${
      props.variant
        ? `
      variant="${props.variant}"`
        : ''
    }${
      props.color
        ? `
      color="${props.color}"`
        : ''
    }${
      props.disableIndicator
        ? `
      disableIndicator`
        : ''
    }${
      props.indicatorInset
        ? `
      indicatorInset`
        : ''
    }>...</Tab>
  </TabList>
  <TabPanel>...</TabPanel>`,
        )
      }
      renderDemo={({
        color,
        variant,
        disableUnderline,
        indicatorInset,
        disableIndicator,
        ...props
      }) => (
        <Tabs {...props} value={index} onChange={(event, value) => setIndex(value)}>
          <TabList disableUnderline={disableUnderline}>
            <Tab
              indicatorInset={indicatorInset}
              disableIndicator={disableIndicator}
              {...(index === 0 && { color, variant })}
            >
              <Apps />
              Tab A
            </Tab>
            <Tab
              indicatorInset={indicatorInset}
              disableIndicator={disableIndicator}
              {...(index === 1 && { color, variant })}
            >
              Tab B
            </Tab>
            <Tab
              indicatorInset={indicatorInset}
              disableIndicator={disableIndicator}
              {...(index === 2 && { color, variant })}
            >
              Tab C
            </Tab>
          </TabList>
          <TabPanel value={0}>Content of Tab A</TabPanel>
          <TabPanel value={1}>Content of Tab B</TabPanel>
          <TabPanel value={2}>Content of Tab C</TabPanel>
        </Tabs>
      )}
    />
  );
}

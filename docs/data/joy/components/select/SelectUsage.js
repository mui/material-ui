import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function SelectUsage() {
  return (
    <JoyUsageDemo
      componentName="Select"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'outlined',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
      ]}
      renderDemo={(props) => (
        <Select defaultValue="react" {...props} sx={{ minWidth: 120 }}>
          <Option value="react">React</Option>
          <Option value="vue">Vue</Option>
          <Option value="svelte">Svelte</Option>
          <Option value="angular">Angular</Option>
        </Select>
      )}
    />
  );
}

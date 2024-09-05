import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function SelectUsage() {
  const [value, setValue] = React.useState(null);
  const action = React.useRef(null);
  return (
    <JoyUsageDemo
      componentName="Select"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
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
        {
          propName: 'placeholder',
          knob: 'input',
          defaultValue: 'Choose one…',
          codeBlockDisplay: true,
        },
        {
          propName: 'disabled',
          knob: 'switch',
        },
        {
          propName: 'children',
          defaultValue: '<Option>...</Option>',
        },
      ]}
      renderDemo={(props) => (
        <Select
          {...props}
          defaultListboxOpen
          action={action}
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          sx={{ minWidth: 160, mb: 20 }}
        >
          <Option value="react">React</Option>
          <Option value="vue">Vue</Option>
          <Option value="svelte">Svelte</Option>
          <Option value="angular">Angular</Option>
        </Select>
      )}
    />
  );
}

import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Input from '@mui/joy/Input';

export default function InputUsage() {
  return (
    <JoyUsageDemo
      componentName="Input"
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
        {
          propName: 'placeholder',
          knob: 'input',
          defaultValue: 'Type something…',
        },
        {
          propName: 'disabled',
          knob: 'switch',
          defaultValue: false,
        },
      ]}
      renderDemo={(props) => <Input {...props} />}
    />
  );
}

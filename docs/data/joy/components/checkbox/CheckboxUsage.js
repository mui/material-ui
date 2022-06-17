import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Checkbox from '@mui/joy/Checkbox';

export default function CheckboxUsage() {
  return (
    <JoyUsageDemo
      componentName="Checkbox"
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
          propName: 'disabled',
          knob: 'switch',
          defaultValue: false,
        },
        {
          propName: 'label',
          knob: 'input',
          defaultValue: 'Label',
        },
      ]}
      renderDemo={(props) => <Checkbox {...props} />}
    />
  );
}

import * as React from 'react';
import Switch from '@mui/joy/Switch';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function SwitchUsage() {
  return (
    <JoyUsageDemo
      componentName="Switch"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          options: ['plain', 'outlined', 'soft', 'solid'],
          defaultValue: 'solid',
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
        { propName: 'checked', knob: 'switch', defaultValue: false },
        { propName: 'disabled', knob: 'switch' },
      ]}
      renderDemo={(props) => <Switch {...props} />}
    />
  );
}

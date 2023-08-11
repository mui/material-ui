import * as React from 'react';
import Chip from '@mui/joy/Chip';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function ChipUsage() {
  return (
    <JoyUsageDemo
      componentName="Chip"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
          defaultValue: 'soft',
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
        { propName: 'onClick', defaultValue: () => {} },
      ]}
      renderDemo={(props) => <Chip {...props}>Chip</Chip>}
    />
  );
}

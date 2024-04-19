import * as React from 'react';
import Alert from '@mui/joy/Alert';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function AlertUsage() {
  return (
    <JoyUsageDemo
      componentName="Alert"
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
      ]}
      renderDemo={(props) => (
        <Alert {...props}>This is a Joy UI Alert — check it out!</Alert>
      )}
    />
  );
}

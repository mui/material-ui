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
          knob: 'select',
          defaultValue: 'soft',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'primary',
        },
      ]}
      renderDemo={(props) => (
        <Alert {...props}>This is a Joy alert — check it out!</Alert>
      )}
    />
  );
}

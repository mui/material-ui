import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import CircularProgress from '@mui/joy/CircularProgress';

export default function CircularProgressUsage() {
  return (
    <JoyUsageDemo
      componentName="CircularProgress"
      data={[
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'primary',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
      ]}
      renderDemo={(props) => <CircularProgress {...props} />}
    />
  );
}

import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Sheet from '@mui/joy/Sheet';

export default function SheetUsage() {
  return (
    <JoyUsageDemo
      componentName="Sheet"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'plain',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
          options: ['neutral', 'primary', 'danger', 'info', 'success', 'warning'],
        },
      ]}
      renderDemo={(props) => (
        <Sheet
          {...props}
          sx={{
            width: 250,
            height: 200,
            m: 1,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Sheet
        </Sheet>
      )}
    />
  );
}

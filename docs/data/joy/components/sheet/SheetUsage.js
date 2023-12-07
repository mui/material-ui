import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function SheetUsage() {
  return (
    <JoyUsageDemo
      componentName="Sheet"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
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

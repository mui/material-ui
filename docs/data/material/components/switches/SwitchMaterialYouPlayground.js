import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material-next/Switch';
import MaterialYouUsageDemo from 'docs/src/modules/components/MaterialYouUsageDemo';

export default function SwitchMaterialYouPlayground() {
  return (
    <MaterialYouUsageDemo
      componentName="Switch"
      data={[
        {
          propName: 'color',
          knob: 'select',
          defaultValue: 'primary',
          options: ['primary', 'secondary', 'tertiary'],
        },
        {
          propName: 'disabled',
          knob: 'switch',
          defaultValue: false,
        },
      ]}
      renderDemo={(props) => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Switch {...props} />
        </Box>
      )}
    />
  );
}

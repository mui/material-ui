import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material-next/Chip';
import MaterialYouUsageDemo from 'docs/src/modules/components/MaterialYouUsageDemo';

export default function ChipMaterialYouPlayground() {
  return (
    <MaterialYouUsageDemo
      componentName="Chip"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'filled',
          options: ['filled', 'outlined', 'elevated'],
        },
        {
          propName: 'color',
          knob: 'select',
          options: [
            'error',
            'info',
            'warning',
            'success',
            'primary',
            'secondary',
            'tertiary',
          ],
        },
        {
          propName: 'size',
          knob: 'select',
          options: ['small', 'medium'],
          defaultValue: 'medium',
        },
        {
          propName: 'disabled',
          knob: 'switch',
          defaultValue: false,
        },
      ]}
      renderDemo={(props) => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Chip {...props} label="Basic chip" />
          <Chip
            {...props}
            label="Clickable chip"
            onClick={() => alert('Clicked Material 3 Chip')}
          />
          <Chip
            {...props}
            label="Deletable chip"
            onDelete={() => alert('Deleted Material 3 Chip')}
          />
        </Box>
      )}
    />
  );
}

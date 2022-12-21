import * as React from 'react';
import MaterialYouUsageDemo from 'docs/src/modules/components/MaterialYouUsageDemo';
import Box from '@mui/material/Box';
import Button from '@mui/material-next/Button';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function ButtonUsage() {
  const [variant, setVariant] = React.useState('text');
  return (
    <MaterialYouUsageDemo
      componentName="Button"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'text',
          options: ['text', 'outlined', 'filled', 'filledTonal', 'elevated'],
          onChange: (e) => setVariant(e.target.value),
        },
        ...(variant === 'filled' || variant === 'text' || variant === 'outlined'
          ? [
              {
                propName: 'color',
                knob: 'select',
                defaultValue: 'primary',
                options: ['primary', 'secondary', 'tertiary'],
              },
            ]
          : []),
        {
          propName: 'size',
          knob: 'select',
          options: ['small', 'medium', 'large'],
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
          <Button {...props}>Hello world</Button>
          <Button {...props} startIcon={<FavoriteBorder />}>
            Hello world
          </Button>
        </Box>
      )}
    />
  );
}

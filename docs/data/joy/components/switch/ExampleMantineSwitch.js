import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';

export default function ExampleMantineSwitch() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch
      variant={checked ? 'solid' : 'outlined'}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      sx={{
        '--Switch-thumb-size': '14px',
        '--Switch-thumb-shadow': 'inset 0 0 0 1px #dee2e6',
        '--Switch-track-width': '38px',
        '--Switch-track-height': '20px',
        '--Switch-track-borderColor': '#dee2e6',
        '--Switch-thumb-background': '#fff',
        '--Switch-track-background': '#e9ecef',
        '&:hover': {
          '--Switch-thumb-background': '#fff',
          '--Switch-track-background': '#e9ecef',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-thumb-shadow': 'none',
          '--Switch-track-background': '#228be6',
          '&:hover': {
            '--Switch-track-background': '#228be6',
          },
        },
        [`&.${switchClasses.disabled}`]: {
          '--Switch-thumb-color': '#f8f9fa',
          '--Switch-track-background': '#e9ecef',
        },
      }}
    />
  );
}

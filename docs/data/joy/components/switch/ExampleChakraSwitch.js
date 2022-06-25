import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';

export default function ExampleChakraSwitch() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      sx={{
        '--Switch-thumb-size': '16px',
        '--Switch-track-width': '34px',
        '--Switch-track-height': '20px',
        '--Switch-track-background': '#CBD5E0',
        '&:hover': {
          '--Switch-track-background': '#CBD5E0',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-track-background': '#3182ce',
          '&:hover': {
            '--Switch-track-background': '#3182ce',
          },
          [`&.${switchClasses.disabled}`]: {
            '--Switch-track-background': '#3182ce',
          },
        },
        [`&.${switchClasses.disabled}`]: {
          '--Switch-track-background': '#CBD5E0',
          opacity: 0.4,
        },
      }}
    />
  );
}

import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';

export default function ExampleChakraSwitch() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      sx={(theme) => ({
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
        [theme.getColorSchemeSelector('dark')]: {
          '--Switch-track-background': 'rgba(255, 255, 255, 0.24)',
          [`&.${switchClasses.checked}`]: {
            '--Switch-track-background': '#90cdf4',
            '&:hover': {
              '--Switch-track-background': '#90cdf4',
            },
            [`&.${switchClasses.disabled}`]: {
              '--Switch-track-background': '#3182ce',
            },
          },
        },
      })}
    />
  );
}

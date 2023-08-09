import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';
import { Theme } from '@mui/joy';

export default function ExampleChakraSwitch() {
  const [checked, setChecked] = React.useState<boolean>(false);
  return (
    <Switch
      checked={checked}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setChecked(event.target.checked)
      }
      sx={(theme: Theme) => ({
        '--Switch-thumbSize': '16px',
        '--Switch-trackWidth': '34px',
        '--Switch-trackHeight': '20px',
        '--Switch-trackBackground': '#CBD5E0',
        '&:hover': {
          '--Switch-trackBackground': '#CBD5E0',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-trackBackground': '#3182ce',
          '&:hover': {
            '--Switch-trackBackground': '#3182ce',
          },
          [`&.${switchClasses.disabled}`]: {
            '--Switch-trackBackground': '#3182ce',
          },
        },
        [`&.${switchClasses.disabled}`]: {
          '--Switch-trackBackground': '#CBD5E0',
          opacity: 0.4,
        },
        [theme.getColorSchemeSelector('dark')]: {
          '--Switch-trackBackground': 'rgba(255, 255, 255, 0.24)',
          [`&.${switchClasses.checked}`]: {
            '--Switch-trackBackground': '#90cdf4',
            '&:hover': {
              '--Switch-trackBackground': '#90cdf4',
            },
            [`&.${switchClasses.disabled}`]: {
              '--Switch-trackBackground': '#3182ce',
            },
          },
        },
      })}
    />
  );
}

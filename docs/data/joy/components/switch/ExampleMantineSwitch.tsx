import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';
import { Theme } from '@mui/joy';

export default function ExampleMantineSwitch() {
  const [checked, setChecked] = React.useState<boolean>(false);
  return (
    <Switch
      variant={checked ? 'solid' : 'outlined'}
      checked={checked}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setChecked(event.target.checked)
      }
      sx={(theme: Theme) => ({
        display: 'inherit',
        '--Switch-thumbSize': '14px',
        '--Switch-thumbShadow': 'inset 0 0 0 1px #dee2e6',
        '--Switch-trackWidth': '38px',
        '--Switch-trackHeight': '20px',
        '--Switch-trackBorderColor': '#dee2e6',
        '--Switch-trackBackground': '#e9ecef',
        '--Switch-thumbBackground': '#fff',
        '&:hover': {
          '--Switch-thumbBackground': '#fff',
          '--Switch-trackBackground': '#e9ecef',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-thumbShadow': 'none',
          '--Switch-trackBackground': '#228be6',
          '&:hover': {
            '--Switch-trackBackground': '#228be6',
          },
        },
        [`&.${switchClasses.disabled}`]: {
          '--Switch-thumbColor': '#f8f9fa',
          '--Switch-trackBackground': '#e9ecef',
        },
        [theme.getColorSchemeSelector('dark')]: {
          '--Switch-trackBorderColor': 'rgb(55, 58, 64)',
          '--Switch-trackBackground': 'rgb(55, 58, 64)',
          '--Switch-thumbShadow': 'none',
        },
      })}
    />
  );
}

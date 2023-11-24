import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';

export default function ExampleFluentSwitch() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch
      variant={checked ? 'solid' : 'outlined'}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      sx={(theme) => ({
        display: 'inherit',
        '--Switch-trackWidth': '40px',
        '--Switch-trackHeight': '20px',
        '--Switch-thumbSize': '12px',
        '--Switch-thumbBackground': 'rgb(96, 94, 92)',
        '--Switch-trackBorderColor': 'rgb(96, 94, 92)',
        '--Switch-trackBackground': theme.vars.palette.background.body,
        '&:hover': {
          '--Switch-trackBorderColor': 'rgb(50, 49, 48)',
          '--Switch-trackBackground': theme.vars.palette.background.body,
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-trackBackground': '#0078D4',
          '&:hover': {
            '--Switch-trackBackground': '#106EBE',
          },
        },
        [`&.${switchClasses.disabled}`]: {
          '--Switch-thumbColor': '#C8C6C4',
          '--Switch-trackBorderColor': '#C8C6C4',
        },
        [`&.${switchClasses.disabled}.${switchClasses.checked}`]: {
          '--Switch-trackBackground': '#C8C6C4',
          '--Switch-thumbColor': '#F3F2F1',
        },
        [theme.getColorSchemeSelector('dark')]: {
          '--Switch-trackBorderColor': 'rgb(161, 159, 157)',
          '--Switch-trackBackground': 'rgb(27, 26, 25)',
          '--Switch-thumbBackground': 'rgb(161, 159, 157)',
          '&:hover': {
            '--Switch-trackBorderColor': '#fff',
            '--Switch-thumbBackground': '#fff',
          },
          [`&.${switchClasses.checked}`]: {
            '--Switch-trackBackground': 'rgb(40, 153, 245)',
            '--Switch-thumbBackground': 'rgb(27, 26, 25)',
            '&:hover': {
              '--Switch-trackBackground': 'rgb(108, 184, 246)',
            },
          },
        },
      })}
    />
  );
}

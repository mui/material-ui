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
        '--Switch-track-width': '40px',
        '--Switch-track-height': '20px',
        '--Switch-thumb-size': '12px',
        '--Switch-thumb-background': 'rgb(96, 94, 92)',
        '--Switch-track-borderColor': 'rgb(96, 94, 92)',
        '--Switch-track-background': theme.vars.palette.background.body,
        '&:hover': {
          '--Switch-track-borderColor': 'rgb(50, 49, 48)',
          '--Switch-track-background': theme.vars.palette.background.body,
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-track-background': '#0078D4',
          '&:hover': {
            '--Switch-track-background': '#106EBE',
          },
        },
        [`&.${switchClasses.disabled}`]: {
          '--Switch-thumb-color': '#C8C6C4',
          '--Switch-track-borderColor': '#C8C6C4',
        },
        [`&.${switchClasses.disabled}.${switchClasses.checked}`]: {
          '--Switch-track-background': '#C8C6C4',
          '--Switch-thumb-color': '#F3F2F1',
        },
        [theme.getColorSchemeSelector('dark')]: {
          '--Switch-track-borderColor': 'rgb(161, 159, 157)',
          '--Switch-track-background': 'rgb(27, 26, 25)',
          '--Switch-thumb-background': 'rgb(161, 159, 157)',
          '&:hover': {
            '--Switch-track-borderColor': '#fff',
            '--Switch-thumb-background': '#fff',
          },
          [`&.${switchClasses.checked}`]: {
            '--Switch-track-background': 'rgb(40, 153, 245)',
            '--Switch-thumb-background': 'rgb(27, 26, 25)',
            '&:hover': {
              '--Switch-track-background': 'rgb(108, 184, 246)',
            },
          },
        },
      })}
    />
  );
}

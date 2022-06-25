import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';

export default function ExampleFluentSwitch() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch
      variant={checked ? 'solid' : 'outlined'}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      sx={{
        '--Switch-track-width': '40px',
        '--Switch-track-height': '20px',
        '--Switch-thumb-size': '12px',
        '--Switch-track-borderColor': '#8A8886', // grey110 in Fluent design
        '--Switch-track-background': (theme) => theme.vars.palette.background.body,
        '&:hover': {
          '--Switch-track-borderColor': '#323130', // grey160 in Fluent design
          '--Switch-track-background': (theme) => theme.vars.palette.background.body,
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
      }}
    />
  );
}

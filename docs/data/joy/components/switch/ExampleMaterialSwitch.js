import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';

export default function ExampleMaterialSwitch() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch
      variant={checked ? 'soft' : 'solid'}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      sx={{
        '--Switch-thumb-shadow':
          'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
        '--Switch-thumb-size': '20px',
        '--Switch-track-width': '34px',
        '--Switch-track-height': '14px',
        '--Switch-track-background': 'rgb(0, 0, 0, 0.38)',
        '&:hover': {
          '--Switch-track-background': 'rgb(0, 0, 0, 0.38)',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-thumb-background': 'rgb(25, 118, 210)',
          '--Switch-track-background': 'rgba(25, 118, 210, 0.5)',
          '&:hover': {
            '--Switch-track-background': 'rgba(25, 118, 210, 0.5)',
          },
        },
        [`&.${switchClasses.disabled}`]: {
          '--Switch-track-background': 'rgb(0, 0, 0, 0.12)',
          '--Switch-thumb-color': 'rgb(245, 245, 245)',
        },
        [`&.${switchClasses.checked}.${switchClasses.disabled}`]: {
          '--Switch-track-background': 'rgba(25, 118, 210, 0.12)',
          '--Switch-thumb-color': 'rgb(167, 202, 237)',
        },
      }}
    />
  );
}

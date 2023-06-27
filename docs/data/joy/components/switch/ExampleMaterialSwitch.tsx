import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';
import { Theme } from '@mui/joy';

export default function ExampleMaterialSwitch() {
  const [checked, setChecked] = React.useState<boolean>(false);
  return (
    <Switch
      variant={checked ? 'soft' : 'solid'}
      checked={checked}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setChecked(event.target.checked)
      }
      sx={(theme: Theme) => ({
        display: 'inherit',
        '--Switch-thumbShadow':
          'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
        '--Switch-thumbSize': '20px',
        '--Switch-trackWidth': '34px',
        '--Switch-trackHeight': '14px',
        '--Switch-trackBackground': 'rgb(0, 0, 0, 0.38)',
        '&:hover': {
          '--Switch-trackBackground': 'rgb(0, 0, 0, 0.38)',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-thumbBackground': 'rgb(25, 118, 210)',
          '--Switch-trackBackground': 'rgba(25, 118, 210, 0.5)',
          '&:hover': {
            '--Switch-trackBackground': 'rgba(25, 118, 210, 0.5)',
          },
        },
        [`&.${switchClasses.disabled}`]: {
          '--Switch-trackBackground': 'rgb(0, 0, 0, 0.12)',
          '--Switch-thumbColor': 'rgb(245, 245, 245)',
        },
        [`&.${switchClasses.checked}.${switchClasses.disabled}`]: {
          '--Switch-trackBackground': 'rgba(25, 118, 210, 0.12)',
          '--Switch-thumbColor': 'rgb(167, 202, 237)',
        },
        [theme.getColorSchemeSelector('dark')]: {
          '--Switch-thumbBackground': '#fff',
          '--Switch-trackBackground': 'rgba(255, 255, 255, 0.3)',
          [`&.${switchClasses.checked}`]: {
            '--Switch-thumbBackground': 'rgb(144, 202, 249)',
            '--Switch-trackBackground': 'rgba(144, 202, 249, 0.5)',
          },
        },
      })}
    />
  );
}

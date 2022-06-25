import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';

export default function ExampleIosSwitch() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch
      color={checked ? 'success' : 'neutral'}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      sx={(theme) => ({
        '--Switch-thumb-shadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
        '--Switch-thumb-size': '27px',
        '--Switch-track-width': '51px',
        '--Switch-track-height': '31px',
        '--Switch-track-background': theme.vars.palette.background.level3,
        '&:hover': {
          '--Switch-track-background': theme.vars.palette.background.level3,
        },
        '&:active': {
          '--Switch-thumb-width': '32px',
          [`& .${switchClasses.thumb}`]: {
            transition: 'width 0.2s, left 0.2s',
          },
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-track-background': 'rgb(48 209 88)',
          '&:hover': {
            '--Switch-track-background': 'rgb(48 209 88)',
          },
        },
      })}
    />
  );
}

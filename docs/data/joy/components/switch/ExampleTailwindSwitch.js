import * as React from 'react';
import Box from '@mui/joy/Box';
import Switch, { switchClasses } from '@mui/joy/Switch';

export default function ExampleTailwindSwitch() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Switch
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        sx={(theme) => ({
          display: 'inherit',
          '--Switch-thumbShadow': theme.vars.shadow.sm,
          '--Switch-thumbSize': '18px',
          '--Switch-trackWidth': '42px',
          '--Switch-trackHeight': '22px',
          '--Switch-trackBackground': '#E9E9EA',
          '&:hover': {
            '--Switch-trackBackground': '#E9E9EA',
          },
          [theme.getColorSchemeSelector('dark')]: {
            '--Switch-trackBackground': 'rgba(255 255 255 / 0.4)',
          },
          [`&.${switchClasses.checked}`]: {
            '--Switch-trackBackground': '#65C466',
            '&:hover': {
              '--Switch-trackBackground': '#65C466',
            },
          },
        })}
      />
      <Switch
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        sx={(theme) => ({
          display: 'inherit',
          '--Switch-thumbShadow': `0 0 0 1px ${theme.vars.palette.background.level3}, 0 1px 4px 0 rgb(0 0 0 / 0.3), 0 1px 2px 0px rgb(0 0 0 / 0.3)`,
          '--Switch-thumbSize': '18px',
          '--Switch-trackWidth': '36px',
          '--Switch-trackHeight': '14px',
          '--Switch-trackBackground': '#E9E9EA',
          '&:hover': {
            '--Switch-trackBackground': '#E9E9EA',
          },
          [theme.getColorSchemeSelector('dark')]: {
            '--Switch-trackBackground': 'rgba(255 255 255 / 0.4)',
          },
          [`&.${switchClasses.checked}`]: {
            '--Switch-trackBackground': '#65C466',
            '&:hover': {
              '--Switch-trackBackground': '#65C466',
            },
          },
        })}
      />
    </Box>
  );
}

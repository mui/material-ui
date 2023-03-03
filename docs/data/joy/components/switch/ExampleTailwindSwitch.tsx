import * as React from 'react';
import Box from '@mui/joy/Box';
import Switch, { switchClasses } from '@mui/joy/Switch';
import { Theme } from '@mui/joy';

export default function ExampleTailwindSwitch() {
  const [checked, setChecked] = React.useState<boolean>(false);
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        sx={(theme: Theme) => ({
          display: 'inherit',
          '--Switch-thumb-shadow': theme.vars.shadow.sm,
          '--Switch-thumb-size': '18px',
          '--Switch-track-width': '42px',
          '--Switch-track-height': '22px',
          '--Switch-track-background': '#E9E9EA',
          '&:hover': {
            '--Switch-track-background': '#E9E9EA',
          },
          [theme.getColorSchemeSelector('dark')]: {
            '--Switch-track-background': 'rgba(255 255 255 / 0.4)',
          },
          [`&.${switchClasses.checked}`]: {
            '--Switch-track-background': '#65C466',
            '&:hover': {
              '--Switch-track-background': '#65C466',
            },
          },
        })}
      />
      <Switch
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        sx={(theme) => ({
          display: 'inherit',
          '--Switch-thumb-shadow': `0 0 0 1px ${theme.vars.palette.background.level3}, 0 1px 4px 0 rgb(0 0 0 / 0.3), 0 1px 2px 0px rgb(0 0 0 / 0.3)`,
          '--Switch-thumb-size': '18px',
          '--Switch-track-width': '36px',
          '--Switch-track-height': '14px',
          '--Switch-track-background': '#E9E9EA',
          '&:hover': {
            '--Switch-track-background': '#E9E9EA',
          },
          [theme.getColorSchemeSelector('dark')]: {
            '--Switch-track-background': 'rgba(255 255 255 / 0.4)',
          },
          [`&.${switchClasses.checked}`]: {
            '--Switch-track-background': '#65C466',
            '&:hover': {
              '--Switch-track-background': '#65C466',
            },
          },
        })}
      />
    </Box>
  );
}

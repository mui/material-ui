import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

// Pins the track colors under `theme.focusVisible` (they move from `opacity` to
// alpha backgrounds so the ring stays visible): default-color checked must dim to 0.5,
// disabled to 0.12, and checked+disabled must dim like disabled — reviewed as broken
// once, so each state gets its own golden pixel here. Vars-mode twin: SwitchTrackStatesVars.
const theme = createTheme({ focusVisible: true });

const states = [
  { label: 'unchecked', props: { color: 'default' } },
  { label: 'checked', props: { color: 'default', defaultChecked: true } },
  { label: 'checked+disabled', props: { color: 'default', defaultChecked: true, disabled: true } },
  { label: 'disabled', props: { disabled: true } },
  { label: 'checked+disabled', props: { defaultChecked: true, disabled: true } },
  { label: 'checked', props: { defaultChecked: true } },
];

export default function SwitchTrackStates() {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2} sx={{ p: 2, alignItems: 'flex-end' }}>
        {states.map(({ label, props }, index) => (
          <Stack key={index} spacing={0.5} sx={{ alignItems: 'center' }}>
            <Switch {...props} />
            <Typography variant="caption">{label}</Typography>
          </Stack>
        ))}
      </Stack>
    </ThemeProvider>
  );
}

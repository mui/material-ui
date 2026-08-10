'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type Preset = 'off' | 'true' | 'custom';

const PRESETS: Record<Preset, object | undefined> = {
  off: undefined,
  true: undefined, // handled as boolean below
  custom: { outlineColor: '#9c27b0', boxShadow: '0 0 0 6px gold' },
};

function StateChip({ on }: { on: boolean }) {
  return (
    <Typography
      component="span"
      variant="caption"
      sx={{
        px: 1,
        py: 0.25,
        borderRadius: 1,
        bgcolor: on ? 'success.main' : 'action.disabledBackground',
        color: on ? 'success.contrastText' : 'text.secondary',
        fontWeight: 700,
        minWidth: 34,
        textAlign: 'center',
      }}
    >
      {on ? 'ON' : 'OFF'}
    </Typography>
  );
}

function ProbeRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Typography variant="body2" sx={{ width: 260, fontWeight: 600 }}>
        {label}
      </Typography>
      {children}
    </Stack>
  );
}

export default function SwitchHitAreaPlayground() {
  const [preset, setPreset] = React.useState<Preset>('true');
  const [showHitArea, setShowHitArea] = React.useState(true);
  const [bareUnchecked, setBareUnchecked] = React.useState(false);
  const [bareChecked, setBareChecked] = React.useState(true);
  const [labeled, setLabeled] = React.useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        ...(preset === 'true' && { focusVisible: true }),
        ...(preset === 'custom' && { focusVisible: PRESETS.custom }),
      }),
    [preset],
  );

  return (
    <Box sx={{ maxWidth: 760, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Switch hit-area probe
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Claim under test: with <code>theme.focusVisible</code> set, a <strong>bare</strong>{' '}
        <code>&lt;Switch /&gt;</code> stops toggling on the far track edge — the right edge when
        unchecked, the left edge when checked — because the input&apos;s hit area is clipped to the
        switchBase box. A <code>FormControlLabel</code> wrapper masks it (label clicks always
        activate). Click precisely on the outermost ~6px of the track and watch the state chip.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={4} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
          <FormControl>
            <FormLabel sx={{ typography: 'subtitle2' }}>theme.focusVisible</FormLabel>
            <RadioGroup
              row
              value={preset}
              onChange={(event) => setPreset(event.target.value as Preset)}
            >
              <FormControlLabel value="off" control={<Radio size="small" />} label="off" />
              <FormControlLabel value="true" control={<Radio size="small" />} label="true" />
              <FormControlLabel
                value="custom"
                control={<Radio size="small" />}
                label="custom (gold shadow)"
              />
            </RadioGroup>
          </FormControl>
          <FormControlLabel
            control={
              <Switch size="small" checked={showHitArea} onChange={(_, v) => setShowHitArea(v)} />
            }
            label={
              <Typography variant="body2">
                Show input hit area <strong>(red)</strong> — a track edge with no red on top is
                unclickable
              </Typography>
            }
          />
        </Stack>
      </Paper>

      <ThemeProvider theme={theme}>
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            ...(showHitArea && {
              '& .probe-target .MuiSwitch-input': {
                opacity: '0.35 !important',
                backgroundColor: 'red',
              },
            }),
          }}
        >
          <Stack spacing={3}>
            <ProbeRow
              label={
                <React.Fragment>
                  Bare, starts OFF — click <u>right</u> track edge
                </React.Fragment>
              }
            >
              <span className="probe-target">
                <Switch checked={bareUnchecked} onChange={(_, v) => setBareUnchecked(v)} />
              </span>
              <StateChip on={bareUnchecked} />
            </ProbeRow>

            <ProbeRow
              label={
                <React.Fragment>
                  Bare, starts ON — click <u>left</u> track edge
                </React.Fragment>
              }
            >
              <span className="probe-target">
                <Switch checked={bareChecked} onChange={(_, v) => setBareChecked(v)} />
              </span>
              <StateChip on={bareChecked} />
            </ProbeRow>

            <ProbeRow label="FormControlLabel wrapper (control case — always works)">
              <span className="probe-target">
                <FormControlLabel
                  control={<Switch checked={labeled} onChange={(_, v) => setLabeled(v)} />}
                  label="labeled"
                />
              </span>
              <StateChip on={labeled} />
            </ProbeRow>
          </Stack>
        </Paper>
      </ThemeProvider>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
        Expected with <code>focusVisible: off</code>: red covers the whole switch (plus overhang) —
        every track pixel toggles. With <code>true</code>/<code>custom</code>: red clips to the 38px
        switchBase box, leaving the far track edge bare — clicks there hit the track span and
        nothing toggles. Keyboard (Tab + Space) works in every mode.
      </Typography>
    </Box>
  );
}

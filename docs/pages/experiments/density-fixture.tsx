'use client';
import * as React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Local verification fixture for the CSS-var density adapter (docs/adr/0001).
// Used by scripts/density-screenshots. Renders one component's load-bearing
// matrix inside #density-scope; the harness sets `level` (default | dense |
// loose), which the scope translates into per-component density-token overrides.
// `level=default` sets no tokens, so the render must be pixel-identical to the
// pre-change baseline. Add a component's matrix to `demos` before verifying it.
const theme = createTheme({ cssVariables: true });

const demos: Record<string, React.ReactNode> = {
  Button: (
    <Stack spacing={2} useFlexGap>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Stack key={size} direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center' }}>
          <Button variant="contained" size={size}>
            Contained
          </Button>
          <Button variant="outlined" size={size}>
            Outlined
          </Button>
          <Button variant="text" size={size}>
            Text
          </Button>
        </Stack>
      ))}
    </Stack>
  ),
  OutlinedInput: (
    <Stack spacing={2} useFlexGap sx={{ maxWidth: 320 }}>
      {(['small', 'medium'] as const).map((size) => (
        <Stack key={size} direction="row" spacing={1} useFlexGap sx={{ alignItems: 'flex-start' }}>
          <OutlinedInput size={size} placeholder={size} />
          <OutlinedInput size={size} placeholder="multiline" multiline />
          <OutlinedInput
            size={size}
            placeholder="adornment"
            startAdornment={<InputAdornment position="start">@</InputAdornment>}
          />
        </Stack>
      ))}
    </Stack>
  ),
  TextField: (
    <Stack spacing={2} useFlexGap sx={{ maxWidth: 280 }}>
      {(['medium', 'small'] as const).map((size) => (
        <FormControl key={size} size={size}>
          <InputLabel>{`outlined ${size}`}</InputLabel>
          <OutlinedInput label={`outlined ${size}`} />
        </FormControl>
      ))}
      <TextField label="value" defaultValue="Value" />
      <TextField
        label="adornments"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          },
        }}
      />
      <TextField label="multiline" multiline rows={2} />
    </Stack>
  ),
};

// Per-component density-token overrides for the review levels. `default` is
// empty on purpose — that render is the pixel-identical regression gate.
const scopes: Record<string, Record<string, React.CSSProperties>> = {
  Button: {
    dense: {
      ['--Button-small-pad' as any]: '2px 6px',
      ['--Button-medium-pad' as any]: '3px 10px',
      ['--Button-large-pad' as any]: '4px 14px',
    },
    loose: {
      ['--Button-small-pad' as any]: '8px 14px',
      ['--Button-medium-pad' as any]: '12px 22px',
      ['--Button-large-pad' as any]: '16px 30px',
    },
  },
  OutlinedInput: {
    dense: {
      ['--OutlinedInput-small-padBlock' as any]: '4px',
      ['--OutlinedInput-medium-padBlock' as any]: '10px',
      ['--OutlinedInput-padInline' as any]: '8px',
    },
    loose: {
      ['--OutlinedInput-small-padBlock' as any]: '14px',
      ['--OutlinedInput-medium-padBlock' as any]: '28px',
      ['--OutlinedInput-padInline' as any]: '24px',
    },
  },
};
// TextField rides the same OutlinedInput tokens; OutlinedInput's `:has` rule
// drives the label's --InputLabel-y, so input box + label move together.
scopes.TextField = scopes.OutlinedInput;

export default function DensityFixture() {
  const router = useRouter();
  const component = (router.query.c as string) || 'Button';
  const level = (router.query.level as string) || 'default';
  const demo = demos[component] ?? <div>No demo registered for &quot;{component}&quot;.</div>;
  const tokens = scopes[component]?.[level] ?? {};
  return (
    <ThemeProvider theme={theme}>
      <Box
        id="density-scope"
        sx={{ display: 'inline-block', p: 2, bgcolor: 'background.paper' }}
        style={tokens}
      >
        {demo}
      </Box>
    </ThemeProvider>
  );
}

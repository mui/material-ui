'use client';
import * as React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import demos from 'docs/src/modules/components/densityDemos';

// Local verification fixture for the CSS-var density adapter (Button only).
// Used by scripts/density-screenshots. Renders Button's load-bearing matrix
// (shared `demos`) inside #density-scope; the harness sets `level`
// (default | dense | loose), which the scope translates into density-token
// overrides. `level=default` sets no tokens, so the render must be
// pixel-identical to the pre-change baseline.
const theme = createTheme({ cssVariables: true });

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
  MenuItem: {
    dense: {
      ['--MenuItem-minHeight' as any]: '36px',
      ['--MenuItem-blockPad' as any]: '3px',
      ['--MenuItem-inlinePad' as any]: '10px',
      ['--MenuItem-dense-minHeight' as any]: '26px',
      ['--MenuItem-dense-blockPad' as any]: '2px',
      ['--MenuItem-dense-inlinePad' as any]: '8px',
    },
    loose: {
      ['--MenuItem-minHeight' as any]: '60px',
      ['--MenuItem-blockPad' as any]: '12px',
      ['--MenuItem-inlinePad' as any]: '28px',
      ['--MenuItem-dense-minHeight' as any]: '44px',
      ['--MenuItem-dense-blockPad' as any]: '8px',
      ['--MenuItem-dense-inlinePad' as any]: '20px',
    },
  },
  Tooltip: {
    dense: {
      ['--Tooltip-blockPad' as any]: '2px',
      ['--Tooltip-inlinePad' as any]: '6px',
      ['--Tooltip-offset' as any]: '10px',
      ['--Tooltip-arrowSize' as any]: '9px',
    },
    loose: {
      ['--Tooltip-blockPad' as any]: '8px',
      ['--Tooltip-inlinePad' as any]: '16px',
      ['--Tooltip-offset' as any]: '20px',
      ['--Tooltip-arrowSize' as any]: '16px',
    },
  },
  OutlinedInput: {
    dense: {
      ['--OutlinedInput-medium-blockPad' as any]: '10px',
      ['--OutlinedInput-small-blockPad' as any]: '5px',
      ['--OutlinedInput-medium-inlinePad' as any]: '10px',
      ['--OutlinedInput-small-inlinePad' as any]: '8px',
      ['--InputAdornment-medium-gap' as any]: '4px',
      ['--InputAdornment-small-gap' as any]: '2px',
    },
    loose: {
      ['--OutlinedInput-medium-blockPad' as any]: '24px',
      ['--OutlinedInput-small-blockPad' as any]: '16px',
      ['--OutlinedInput-medium-inlinePad' as any]: '20px',
      ['--OutlinedInput-small-inlinePad' as any]: '16px',
      ['--InputAdornment-medium-gap' as any]: '14px',
      ['--InputAdornment-small-gap' as any]: '10px',
    },
  },
  FilledInput: {
    dense: {
      ['--FilledInput-medium-topPad' as any]: '18px',
      ['--FilledInput-medium-bottomPad' as any]: '4px',
      ['--FilledInput-medium-inlinePad' as any]: '8px',
      ['--FilledInputLabel-restY' as any]: '11px',
      ['--FilledInputLabel-shrinkY' as any]: '5px',
    },
    loose: {
      ['--FilledInput-medium-topPad' as any]: '34px',
      ['--FilledInput-medium-bottomPad' as any]: '12px',
      ['--FilledInput-medium-inlinePad' as any]: '16px',
      ['--FilledInputLabel-restY' as any]: '22px',
      ['--FilledInputLabel-shrinkY' as any]: '10px',
    },
  },
  Input: {
    dense: {
      ['--Input-medium-topPad' as any]: '2px',
      ['--Input-bottomPad' as any]: '2px',
    },
    loose: {
      ['--Input-medium-topPad' as any]: '12px',
      ['--Input-bottomPad' as any]: '12px',
    },
  },
  Checkbox: {
    dense: {
      ['--Checkbox-medium-pad' as any]: '4px',
      ['--Checkbox-small-pad' as any]: '2px',
    },
    loose: {
      ['--Checkbox-medium-pad' as any]: '14px',
      ['--Checkbox-small-pad' as any]: '12px',
    },
  },
  CardContent: {
    dense: {
      ['--CardContent-pad' as any]: '8px',
      ['--CardContent-padBottom' as any]: '12px',
    },
    loose: {
      ['--CardContent-pad' as any]: '32px',
      ['--CardContent-padBottom' as any]: '40px',
    },
  },
  Select: {
    dense: { ['--Select-minHeight' as any]: '16px' },
    loose: { ['--Select-minHeight' as any]: '40px' },
  },
  Chip: {
    dense: {
      ['--Chip-medium-height' as any]: '26px',
      ['--Chip-small-height' as any]: '20px',
      ['--Chip-medium-padInline' as any]: '8px',
      ['--Chip-small-padInline' as any]: '6px',
    },
    loose: {
      ['--Chip-medium-height' as any]: '40px',
      ['--Chip-small-height' as any]: '32px',
      ['--Chip-medium-padInline' as any]: '16px',
      ['--Chip-small-padInline' as any]: '12px',
    },
  },
  Alert: {
    dense: {
      ['--Alert-blockPad' as any]: '2px',
      ['--Alert-inlinePad' as any]: '10px',
      ['--Alert-iconGap' as any]: '6px',
    },
    loose: {
      ['--Alert-blockPad' as any]: '14px',
      ['--Alert-inlinePad' as any]: '28px',
      ['--Alert-iconGap' as any]: '20px',
    },
  },
  Tab: {
    dense: {
      ['--Tab-minHeight' as any]: '40px',
      ['--Tabs-minHeight' as any]: '40px',
      ['--Tab-iconLabel-minHeight' as any]: '60px',
      ['--Tab-blockPad' as any]: '8px',
      ['--Tab-iconLabel-blockPad' as any]: '6px',
      ['--Tab-inlinePad' as any]: '12px',
      ['--Tab-icon-stackGap' as any]: '4px',
      ['--Tab-icon-inlineGap' as any]: '6px',
    },
    loose: {
      ['--Tab-minHeight' as any]: '60px',
      ['--Tabs-minHeight' as any]: '60px',
      ['--Tab-iconLabel-minHeight' as any]: '88px',
      ['--Tab-blockPad' as any]: '16px',
      ['--Tab-iconLabel-blockPad' as any]: '12px',
      ['--Tab-inlinePad' as any]: '28px',
      ['--Tab-icon-stackGap' as any]: '10px',
      ['--Tab-icon-inlineGap' as any]: '12px',
    },
  },
};

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

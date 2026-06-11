'use client';
import * as React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import demos from 'docs/src/modules/components/densityDemos';

// Local verification fixture for the CSS-var density adapter (docs/adr/0001).
// Used by scripts/density-screenshots. Renders one component's load-bearing
// matrix (shared `demos`) inside #density-scope; the harness sets `level`
// (default | dense | loose), which the scope translates into per-component
// density-token overrides. `level=default` sets no tokens, so the render must be
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
  OutlinedInput: {
    dense: {
      ['--OutlinedInput-small-padBlock' as any]: '4px',
      ['--OutlinedInput-medium-padBlock' as any]: '10px',
      ['--OutlinedInput-small-padInline' as any]: '6px',
      ['--OutlinedInput-medium-padInline' as any]: '8px',
    },
    loose: {
      ['--OutlinedInput-small-padBlock' as any]: '14px',
      ['--OutlinedInput-medium-padBlock' as any]: '28px',
      ['--OutlinedInput-small-padInline' as any]: '20px',
      ['--OutlinedInput-medium-padInline' as any]: '24px',
    },
  },
  Chip: {
    dense: {
      ['--Chip-small-height' as any]: '18px',
      ['--Chip-medium-height' as any]: '24px',
      ['--Chip-small-padInline' as any]: '4px',
      ['--Chip-medium-padInline' as any]: '6px',
    },
    loose: {
      ['--Chip-small-height' as any]: '32px',
      ['--Chip-medium-height' as any]: '44px',
      ['--Chip-small-padInline' as any]: '14px',
      ['--Chip-medium-padInline' as any]: '20px',
    },
  },
  IconButton: {
    dense: {
      ['--IconButton-small-pad' as any]: '1px',
      ['--IconButton-medium-pad' as any]: '3px',
      ['--IconButton-large-pad' as any]: '6px',
    },
    loose: {
      ['--IconButton-small-pad' as any]: '10px',
      ['--IconButton-medium-pad' as any]: '16px',
      ['--IconButton-large-pad' as any]: '22px',
    },
  },
  MenuItem: {
    dense: {
      ['--MenuItem-minHeight' as any]: '36px',
      ['--MenuItem-dense-minHeight' as any]: '24px',
      ['--MenuItem-padBlock' as any]: '2px',
      ['--MenuItem-dense-padBlock' as any]: '1px',
      ['--MenuItem-padInline' as any]: '8px',
      ['--MenuItem-dense-padInline' as any]: '6px',
    },
    loose: {
      ['--MenuItem-minHeight' as any]: '64px',
      ['--MenuItem-dense-minHeight' as any]: '48px',
      ['--MenuItem-padBlock' as any]: '14px',
      ['--MenuItem-dense-padBlock' as any]: '10px',
      ['--MenuItem-padInline' as any]: '28px',
      ['--MenuItem-dense-padInline' as any]: '24px',
    },
  },
  ListItemButton: {
    dense: {
      ['--ListItemButton-padBlock' as any]: '2px',
      ['--ListItemButton-dense-padBlock' as any]: '0px',
      ['--ListItemButton-padInline' as any]: '8px',
      ['--ListItemButton-dense-padInline' as any]: '4px',
    },
    loose: {
      ['--ListItemButton-padBlock' as any]: '16px',
      ['--ListItemButton-dense-padBlock' as any]: '12px',
      ['--ListItemButton-padInline' as any]: '32px',
      ['--ListItemButton-dense-padInline' as any]: '24px',
    },
  },
  ListItemIcon: {
    dense: { ['--ListItemIcon-minWidth' as any]: '24px' },
    loose: { ['--ListItemIcon-minWidth' as any]: '56px' },
  },
  ListItemText: {
    dense: {
      ['--ListItemText-marginBlock' as any]: '1px',
      ['--ListItemText-dense-marginBlock' as any]: '0px',
      ['--ListItemText-insetPad' as any]: '32px',
      ['--ListItemText-dense-insetPad' as any]: '24px',
    },
    loose: {
      ['--ListItemText-marginBlock' as any]: '12px',
      ['--ListItemText-dense-marginBlock' as any]: '8px',
      ['--ListItemText-insetPad' as any]: '72px',
      ['--ListItemText-dense-insetPad' as any]: '64px',
    },
  },
  ListSubheader: {
    dense: {
      ['--ListSubheader-height' as any]: '32px',
      ['--ListSubheader-padInline' as any]: '8px',
      ['--ListSubheader-inset' as any]: '48px',
    },
    loose: {
      ['--ListSubheader-height' as any]: '64px',
      ['--ListSubheader-padInline' as any]: '28px',
      ['--ListSubheader-inset' as any]: '96px',
    },
  },
  Toolbar: {
    dense: {
      ['--Toolbar-dense-minHeight' as any]: '32px',
      ['--Toolbar-padInline' as any]: '8px',
    },
    loose: {
      ['--Toolbar-dense-minHeight' as any]: '72px',
      ['--Toolbar-padInline' as any]: '40px',
    },
  },
  Tab: {
    dense: {
      ['--Tab-padBlock' as any]: '4px',
      ['--Tab-padInline' as any]: '8px',
      ['--Tab-minHeight' as any]: '32px',
      ['--Tab-iconSpacing' as any]: '2px',
    },
    loose: {
      ['--Tab-padBlock' as any]: '20px',
      ['--Tab-padInline' as any]: '28px',
      ['--Tab-minHeight' as any]: '72px',
      ['--Tab-iconSpacing' as any]: '14px',
    },
  },
  Tabs: {
    dense: {
      ['--Tabs-minHeight' as any]: '32px',
      ['--Tab-padBlock' as any]: '4px',
      ['--Tab-padInline' as any]: '8px',
      ['--Tab-minHeight' as any]: '32px',
      ['--Tab-iconSpacing' as any]: '2px',
    },
    loose: {
      ['--Tabs-minHeight' as any]: '72px',
      ['--Tab-padBlock' as any]: '20px',
      ['--Tab-padInline' as any]: '32px',
      ['--Tab-minHeight' as any]: '72px',
      ['--Tab-iconSpacing' as any]: '14px',
    },
  },
  TablePagination: {
    dense: {
      ['--TablePagination-minHeight' as any]: '36px',
      ['--TablePagination-actionsSpacing' as any]: '8px',
      ['--TablePagination-selectSpacing' as any]: '12px',
    },
    loose: {
      ['--TablePagination-minHeight' as any]: '72px',
      ['--TablePagination-actionsSpacing' as any]: '40px',
      ['--TablePagination-selectSpacing' as any]: '56px',
    },
  },
  CardContent: {
    dense: {
      ['--CardContent-pad' as any]: '8px',
      ['--CardContent-padBottom' as any]: '10px',
    },
    loose: {
      ['--CardContent-pad' as any]: '32px',
      ['--CardContent-padBottom' as any]: '40px',
    },
  },
  Select: {
    dense: { ['--Select-minHeight' as any]: '0.8em' },
    loose: { ['--Select-minHeight' as any]: '2.4em' },
  },
  Breadcrumbs: {
    dense: { ['--Breadcrumbs-separatorGap' as any]: '2px' },
    loose: { ['--Breadcrumbs-separatorGap' as any]: '20px' },
  },
  InputAdornment: {
    dense: {
      ['--InputAdornment-small-gap' as any]: '2px',
      ['--InputAdornment-medium-gap' as any]: '3px',
      ['--InputAdornment-small-marginTop' as any]: '6px',
      ['--InputAdornment-medium-marginTop' as any]: '10px',
    },
    loose: {
      ['--InputAdornment-small-gap' as any]: '16px',
      ['--InputAdornment-medium-gap' as any]: '24px',
      ['--InputAdornment-small-marginTop' as any]: '24px',
      ['--InputAdornment-medium-marginTop' as any]: '32px',
    },
  },
  Badge: {
    dense: {
      ['--Badge-standard-pad' as any]: '0 3px',
      ['--Badge-standard-size' as any]: '14px',
      ['--Badge-dot-size' as any]: '5px',
    },
    loose: {
      ['--Badge-standard-pad' as any]: '0 10px',
      ['--Badge-standard-size' as any]: '28px',
      ['--Badge-dot-size' as any]: '12px',
    },
  },
  Checkbox: {
    dense: {
      ['--Checkbox-small-pad' as any]: '3px',
      ['--Checkbox-medium-pad' as any]: '5px',
    },
    loose: {
      ['--Checkbox-small-pad' as any]: '7px',
      ['--Checkbox-medium-pad' as any]: '13px',
    },
  },
  Radio: {
    dense: {
      ['--Radio-small-pad' as any]: '3px',
      ['--Radio-medium-pad' as any]: '5px',
    },
    loose: {
      ['--Radio-small-pad' as any]: '7px',
      ['--Radio-medium-pad' as any]: '13px',
    },
  },
  Switch: {
    // Tune the interlocked dims + track gutter (pad); thumb pad/top/travel re-derive
    // (touchSize == height keeps the thumb centered). thumbSize < height; width >
    // touchSize; pad < height/2.
    dense: {
      ['--Switch-small-width' as any]: '32px',
      ['--Switch-small-height' as any]: '18px',
      ['--Switch-small-thumbSize' as any]: '12px',
      ['--Switch-small-touchSize' as any]: '18px',
      ['--Switch-small-pad' as any]: '5px',
      ['--Switch-medium-width' as any]: '44px',
      ['--Switch-medium-height' as any]: '24px',
      ['--Switch-medium-thumbSize' as any]: '16px',
      ['--Switch-medium-touchSize' as any]: '24px',
      ['--Switch-medium-pad' as any]: '8px',
    },
    loose: {
      ['--Switch-small-width' as any]: '52px',
      ['--Switch-small-height' as any]: '32px',
      ['--Switch-small-thumbSize' as any]: '24px',
      ['--Switch-small-touchSize' as any]: '32px',
      ['--Switch-small-pad' as any]: '10px',
      ['--Switch-medium-width' as any]: '76px',
      ['--Switch-medium-height' as any]: '48px',
      ['--Switch-medium-thumbSize' as any]: '34px',
      ['--Switch-medium-touchSize' as any]: '48px',
      ['--Switch-medium-pad' as any]: '16px',
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

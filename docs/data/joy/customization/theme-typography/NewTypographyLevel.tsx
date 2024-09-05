import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';

declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    kbd: true;
  }
}

const customTheme = extendTheme({
  typography: {
    kbd: {
      background:
        'linear-gradient(to top, var(--joy-palette-background-level2), var(--joy-palette-background-surface))',
      border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
      borderRadius: 'var(--joy-radius-xs)',
      boxShadow: 'var(--joy-shadow-sm)',
      padding: '0.125em 0.375em',
    },
  },
});

export default function NewTypographyLevel() {
  return (
    <CssVarsProvider theme={customTheme}>
      <div>
        <Typography>
          Press <Typography level="kbd">⌘</Typography> +{' '}
          <Typography level="kbd">k</Typography> to search the documentation.
        </Typography>
      </div>
    </CssVarsProvider>
  );
}

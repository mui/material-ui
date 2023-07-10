import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

const customTheme = extendTheme({
  typography: {
    kbd: {
      backgroundColor: 'var(--joy-palette-background-surface)',
      border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
      borderRadius: 'var(--joy-radius-xs)',
      boxShadow: '0 2px 0px 0px var(--joy-palette-background-level3)',
      padding: '0.125em 0.375em',
    },
  },
});

export default function MoreTypographyLevel() {
  return (
    <CssVarsProvider theme={customTheme}>
      <Box>
        <Typography>
          Press <Typography level="kbd">⌘</Typography> +{' '}
          <Typography level="kbd">k</Typography> to search the documentation.
        </Typography>
      </Box>
    </CssVarsProvider>
  );
}

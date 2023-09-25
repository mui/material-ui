import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  CssVarsProvider,
  THEME_ID,
  extendTheme,
  ColorPaletteProp,
  VariantProp,
  PaletteVariant,
} from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import SvgIcon from '@mui/joy/SvgIcon';

const OrderDashboardApp = dynamic(
  () => import('docs/data/joy/getting-started/templates/order-dashboard/App'),
  {
    ssr: false,
  },
);

export default function ThemeBuilder() {
  return (
    <CssVarsProvider theme={{ [THEME_ID]: extendTheme() }}>
      <Box
        sx={{
          transform: 'scale(0.9)',
          overflow: 'hidden',
          position: 'relative',
          transformOrigin: 'top left',
          bgcolor: 'background.body',
        }}
      >
        <OrderDashboardApp disableCssReset />
      </Box>
      <Card
        size="sm"
        sx={{
          position: 'fixed',
          '--_inset': '1rem',
          bottom: 'var(--_inset)',
          top: 'calc(var(--_inset) + 64px)',
          right: 'var(--_inset)',
          boxShadow: 'lg',
          width: 256,
          zIndex: 1000,
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography level="title-md">Theme builder</Typography>
          <IconButton
            variant="outlined"
            size="sm"
            sx={{
              ml: 'auto',
              color: 'primary.outlinedColor',
              '--IconButton-size': '28px',
              '--Icon-color': 'currentColor',
            }}
          >
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
                <path d="m14 7 3 3" />
                <path d="M5 6v4" />
                <path d="M19 14v4" />
                <path d="M10 2v2" />
                <path d="M7 8H3" />
                <path d="M21 16h-4" />
                <path d="M11 3H9" />
              </svg>
            </SvgIcon>
          </IconButton>
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            sx={{ color: 'primary.outlinedColor', minHeight: 28 }}
          >
            Reset
          </Button>
        </Box>
      </Card>
    </CssVarsProvider>
  );
}

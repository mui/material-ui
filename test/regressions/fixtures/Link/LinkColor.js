import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';

export default function DeterminateLinearProgress() {
  return (
    <div>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiLink: {
              styleOverrides: {
                root: ({ ownerState, theme }) => ({
                  ...(ownerState.color === 'secondary' && {
                    color: theme.palette.error.main,
                  }),
                }),
              },
              variants: [
                {
                  props: { color: 'textPrimary' },
                  style: ({ theme }) => ({
                    color: theme.palette.warning.main,
                  }),
                },
              ],
            },
          },
        })}
      >
        <Link href="#unknown">primary</Link>
        <Link href="#unknown" color="secondary">
          error
        </Link>
        <Link href="#unknown" color="textPrimary">
          warning
        </Link>
      </ThemeProvider>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiLink: {
              styleOverrides: {
                root: {
                  color: '#fbca04', // orange
                },
              },
            },
          },
        })}
      >
        <Link href="#unknown">#fbca04</Link>
        <Link href="#unknown" color="#ff5252">
          #ff5252
        </Link>
        <Link href="#unknown" sx={{ color: '#ff5252' }}>
          #ff5252 (primary underline)
        </Link>
        <Link href="#unknown" sx={(theme) => ({ color: theme.palette.secondary.main })}>
          secondary
        </Link>
        <Link href="#unknown" sx={{ color: (theme) => theme.palette.error.main }}>
          error
        </Link>
      </ThemeProvider>
    </div>
  );
}

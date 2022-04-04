import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';

export default function DeterminateLinearProgress() {
  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiLink: {
            styleOverrides: {
              root: {
                color: '#0068a9', // blue
              },
            },
          },
        },
      })}
    >
      <Link href="#unknown">#0068a9</Link>
      <Link href="#unknown" color="#ff5252">
        #ff5252
      </Link>
      <Link href="#unknown" sx={{ color: '#ff5252' }}>
        #ff5252
      </Link>
    </ThemeProvider>
  );
}

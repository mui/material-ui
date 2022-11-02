'use client';
import RootStyleRegistry from './emotion';
import theme, { roboto } from '../src/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body className={roboto.className}>
        <RootStyleRegistry>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </RootStyleRegistry>
      </body>
    </html>
  );
}

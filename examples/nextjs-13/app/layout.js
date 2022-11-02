'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import RootStyleRegistry from './emotion';
import theme, { roboto } from '../src/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body>
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

RootLayout.propTypes = {
  children: PropTypes.node,
};

import * as React from 'react';
/** @jsx jsx */
import {
    jsx,
    Box,
    ThemeProvider
  } from 'theme-ui';
import { alpha } from '@material-ui/core/styles';
import { logReactMetrics } from '../utils';

const theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
}

export default function BasicStyledComponents() {
    return (
      <React.Profiler id="sx-prop-box-theme-ui" onRender={logReactMetrics}>
        {new Array(1000).fill().map(() => (
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                width: 200,
                height: 200,
                color: 'primary',
                backgroundColor: ['primary', 'text', 'background'],
                borderWidth: '3px',
                borderColor: 'white',
                borderStyle: ['dashed', 'solid', 'dotted'],
                ':hover': {
                  backgroundColor: (theme) => theme.colors.text,
                },
              }}
            >
              theme-ui
            </Box>
          </ThemeProvider>
        ))}
      </React.Profiler>
    );
  }
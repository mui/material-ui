import * as React from 'react';
/** @jsx jsx */
import {
    jsx,
    ThemeProvider
  } from 'theme-ui';
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
        <ThemeProvider theme={theme}>
          {new Array(1000).fill().map(() => (
              <div
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
              </div>
          ))}
        </ThemeProvider>
      </React.Profiler>
    );
  }
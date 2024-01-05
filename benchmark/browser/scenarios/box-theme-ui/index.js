import * as React from 'react';
import { Box, ThemeUIProvider } from 'theme-ui';

const theme = {
  breakpoints: ['40em', '52em', '64em'],
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
};

export default function BoxThemeUI() {
  return (
    <ThemeUIProvider theme={theme}>
      {new Array(1000).fill().map(() => (
        <Box
          sx={{
            width: 200,
            height: 200,
            borderWidth: '3px',
            borderColor: 'white',
            backgroundColor: ['primary', 'text', 'background'],
            borderStyle: ['dashed', 'solid', 'dotted'],
            '&:hover': {
              backgroundColor: (t) => t.colors.text,
            },
          }}
        >
          test case
        </Box>
      ))}
    </ThemeUIProvider>
  );
}

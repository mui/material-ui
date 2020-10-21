import * as React from 'react';
import { Box, ThemeProvider, theme } from '@chakra-ui/core';

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
};

export default function BoxChakraUi() {
  return (
    <ThemeProvider theme={customTheme}>
      {new Array(1000).fill().map(() => (
        <Box
          color="primary.main"
          bg="background.paper"
          fontWeight="semibold"
          fontSize={['30em', '48em', '62em', '80em']}
          p={[2, 3, 4]}
        >
          chakra-ui
        </Box>
      ))}
    </ThemeProvider>
  );
}

import * as React from 'react';
import { Box } from '@material-ui/system';
import { ThemeContext } from '@material-ui/styled-engine';

export default function BoxSx() {
  return (
    <ThemeContext.Provider
      value={{
        palette: {
          primary: {
            main: '#00cc44',
            dark: '#00802b',
          },
        },
      }}
    >
      <Box
        sx={{
          width: 300,
          height: 300,
          bgcolor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
    </ThemeContext.Provider>
  );
}

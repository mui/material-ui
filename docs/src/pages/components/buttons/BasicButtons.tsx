import * as React from 'react';
import Stack from '@material-ui/core/Stack';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

export default function BasicButtons() {
  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              contained: {
                '&.Mui-disabled': {
                  opacity: 0.65,
                },
              },
              containedPrimary: {
                '&.Mui-disabled': {
                  color: '#fff',
                  backgroundColor: 'red',
                },
              },
            },
          },
        },
      })}
    >
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained" color="primary" disabled>
          Contained
        </Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </ThemeProvider>
  );
}

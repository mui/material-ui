import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function TypographyColor() {
  return (
    <div>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiTypography: {
              styleOverrides: {
                root: ({ ownerState, theme }) => ({
                  ...(ownerState.color === 'secondary.main' && {
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
        <Typography>default</Typography>
        <Typography color="primary">primary</Typography>
        <Typography color="secondary">error (styleOverride)</Typography>
        <Typography color="textPrimary">warning (variant)</Typography>
        <Typography color="success">success</Typography>
        <Typography color="success.light">success.light</Typography>
      </ThemeProvider>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiTypography: {
              styleOverrides: {
                root: {
                  color: '#fbca04',
                },
              },
            },
          },
        })}
      >
        <Typography>#fbca04</Typography>
        <Typography color="#ff5252">#ff5252</Typography>
        <Typography sx={{ color: '#ff5252' }}>#ff5252</Typography>
        <Typography sx={(theme) => ({ color: theme.palette.secondary.main })}>secondary</Typography>
        <Typography sx={{ color: (theme) => theme.palette.error.main }}>error</Typography>
      </ThemeProvider>
    </div>
  );
}

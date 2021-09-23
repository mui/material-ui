import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const grey = {
  50: '#F3F6F9',
  100: '#EAEEF3',
  200: '#E5E8EC',
  300: '#D7DCE1',
  400: '#BFC7CF',
  500: '#AAB4BE',
  600: '#7F8E9D',
  700: '#46505A', // contrast 8.21:1
  800: '#2F3A45', // contrast 11.58:1
  900: '#20262D',
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#0072E5',
    },
  },
  // Pain: Source has 2 element(s) but target requires 25
  shadows: ['none', '0px 4px 20px rgba(61, 71, 82, 0.15)'] as any,
  typography: {
    fontFamily: ['"IBM Plex Sans"'].join(','),
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    // Pain: Missing documentation for this?
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: grey[50],
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: grey[800],
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          background: grey[50],
          '&:before': {
            borderBottomColor: grey[300],
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          background: 'linear-gradient(-10deg, #0059B3 0%, #007FFF 100%)',
          paddingTop: 9,
          paddingBottom: 9,
        },
      },
    },
  },
});

export default function LogInScreen() {
  return (
    <ThemeProvider theme={theme}>
      <AppTheme>
        <CssBaseline />
        <Container mt={10} maxWidth="xs" component={Box}>
          <Paper p={2} component={Box}>
            <Typography variant="h6" component="h1">
              Log In
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <Box mt={2}>
                <TextField variant="filled" type="email" label="Email" fullWidth margin="dense" />
                <TextField
                  variant="filled"
                  type="password"
                  label="Password"
                  fullWidth
                  margin="dense"
                />
              </Box>
              <Box mt={3}>
                <Button type="submit" variant="contained" fullWidth>
                  Log In
                </Button>
              </Box>
            </Box>
            <Grid
              container
              justifyContent="space-between"
              alignItems="flex-start"
              mt={3}
              maxWidth="xs"
              component={Box}
            >
              <Grid item xs>
                <Link href="/drafts" variant="body2">
                  Create account
                </Link>
              </Grid>
              <Grid item>
                <Link href="/drafts" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </AppTheme>
    </ThemeProvider>
  );
}

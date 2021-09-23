import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const theme = createTheme();

export default function LogInScreen() {
  return (
    <ThemeProvider theme={theme}>
      <AppTheme>
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
              <Grid container justifyContent="flex-end" xs>
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

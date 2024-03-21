import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { alpha, PaletteMode } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

import ForgotPassword from './ForgotPassword';
import getSignInTheme from './getSignInTheme';
import ToggleColorMode from './ToggleColorMode';

interface ToggleCustomThemeProps {
  showCustomTheme: Boolean;
  toggleCustomTheme: () => void;
}

function ToggleCustomTheme({
  showCustomTheme,
  toggleCustomTheme,
}: ToggleCustomThemeProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

const logoStyle = {
  width: '140px',
  height: '56px',
  marginLeft: '-16px',
  marginTop: '-16px',
};

export default function SignIn() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
      <CssBaseline />
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={(theme) => ({
          backgroundImage:
            theme.palette.mode === 'light'
              ? `linear-gradient(180deg, ${alpha('#CEE5FD', 0.2)}, #FFF)`
              : `linear-gradient(${alpha('#02294F', 0.2)}, ${alpha('#021F3B', 0.0)})`,
          backgroundRepeat: 'no-repeat',
          px: { xs: 2, sm: 4 },
          height: '100dvh',
        })}
        component="main"
      >
        <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            component="a"
            href="/material-ui/getting-started/templates/"
          >
            Back
          </Button>
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        </Stack>
        <Stack
          justifyContent={{ xs: 'start', sm: 'center' }}
          sx={{ height: '100%', mt: { xs: 0, sm: -72 } }}
        >
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { sm: '100%', md: '450px' },
              mx: 'auto',
              p: 4,
              gap: 4,
            }}
          >
            <img
              src={
                'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
              }
              style={logoStyle}
              alt="logo of sitemark"
            />
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.5rem)' }}
            >
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={emailError}
                    helperText={emailErrorMessage}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    autoComplete="email"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={emailError ? 'error' : 'primary'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    name="password"
                    placeholder="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={passwordError ? 'error' : 'primary'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Link component="button" onClick={handleClickOpen} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <ForgotPassword open={open} handleClose={handleClose} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Sign In
              </Button>
              <Link
                href="/material-ui/getting-started/templates/sign-up/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
            <Divider>Or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => alert('Sign in with Google')}
                startIcon={
                  <img
                    src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
                    alt="Google"
                    style={{ width: 16, height: 16 }}
                  />
                }
              >
                Sign In with Google
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => alert('Sign in with Facebook')}
                startIcon={
                  <img
                    src="https://www.vectorlogo.zone/logos/facebook/facebook-tile.svg"
                    alt="Google"
                    style={{ width: 16, height: 16 }}
                  />
                }
              >
                Sign In with Facebook
              </Button>
            </Box>
          </Card>
        </Stack>
      </Stack>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import OutlinedInput from '@mui/material/OutlinedInput';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

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

const whiteLogo =
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf7356420e154daf_SitemarkLight.svg';
const darkLogo =
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73563dba154dad_SitemarkDark.svg';

const logoStyle = {
  width: '140px',
  height: '56px',
  opacity: 0.8,
  marginLeft: '-16px',
};

export default function SignIn() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));
  const logo = showCustomTheme
    ? SignInTheme.palette.mode === 'light'
      ? darkLogo
      : whiteLogo
    : defaultTheme.palette.mode === 'light'
      ? darkLogo
      : whiteLogo;

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            minWidth: '450px',
            gap: 4,
            border: '1px solid',
            borderColor: 'divider',
            p: 4,
            borderRadius: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <img src={logo} style={logoStyle} alt="logo of sitemark" />
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          </Box>
          <Typography component="h1" variant="h3" sx={{ width: '100%' }}>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 2 }}
          >
            <OutlinedInput
              id="email"
              label="Email Address"
              name="email"
              placeholder="email"
              autoComplete="email"
              autoFocus
              required
              fullWidth
            />
            <OutlinedInput
              name="password"
              placeholder="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
            />
            <Link href="#" variant="body2" sx={{ alignSelf: 'start' }}>
              Forgot password?
            </Link>
            <Button type="submit" fullWidth variant="contained">
              Sign In
            </Button>
            <Link href="#" variant="body2" sx={{ alignSelf: 'center' }}>
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
        </Box>
      </Container>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}

import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import customTheme from './theme';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle({ onClick, ...props }: IconButtonProps) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="neutral"
      {...props}
      onClick={(event) => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
        onClick?.(event);
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function JoySignInTemplate() {
  return (
    <CssVarsProvider
      defaultMode="dark"
      disableTransitionOnChange
      theme={customTheme}
    >
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Collapsed-breakpoint': '769px',
            '--Cover-width': '40vw', // must be `vw` only
            '--Form-maxWidth': '700px',
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
          transition: '0.4s',
          transitionDelay: '0.1s',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(255 255 255 / 0.6)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width:
              'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
            maxWidth: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              fontWeight="lg"
              startDecorator={
                <Box
                  component="span"
                  sx={{
                    width: 24,
                    height: 24,
                    background: (theme) =>
                      `linear-gradient(45deg, ${theme.vars.palette.primary.solidBg}, ${theme.vars.palette.primary.solidBg} 30%, ${theme.vars.palette.primary.softBg})`,
                    borderRadius: '50%',
                    boxShadow: (theme) => theme.shadow.md,
                    '--joy-shadowChannel': (theme) =>
                      theme.vars.palette.primary.mainChannel,
                  }}
                />
              }
            >
              Logo
            </Typography>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
            }}
          >
            <div>
              <Typography component="h2" fontSize="xl2" fontWeight="lg">
                Welcome back
              </Typography>
              <Typography level="body2" sx={{ my: 1, mb: 3 }}>
                Let&apos;s get started! Please enter your details.
              </Typography>
            </div>
            <form
              onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;
                const data = {
                  email: formElements.email.value,
                  password: formElements.password.value,
                  persistent: formElements.persistent.checked,
                };
                alert(JSON.stringify(data, null, 2));
              }}
            >
              <FormControl required>
                <FormLabel slotProps={{ asterisk: { sx: { display: 'none' } } }}>
                  Email
                </FormLabel>
                <Input placeholder="Enter your email" type="email" name="email" />
              </FormControl>
              <FormControl required>
                <FormLabel slotProps={{ asterisk: { sx: { display: 'none' } } }}>
                  Password
                </FormLabel>
                <Input placeholder="•••••••" type="password" name="password" />
              </FormControl>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Checkbox size="sm" label="Remember for 30 days" name="persistent" />
                <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg">
                  Forgot password
                </Link>
              </Box>
              <Button type="submit" sx={{ width: '100%' }}>
                Sign in
              </Button>
            </form>
            <Button
              variant="outlined"
              color="neutral"
              sx={{ width: '100%' }}
              startDecorator={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path
                      fill="#4285F4"
                      d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                    />
                  </g>
                </svg>
              }
            >
              Sign in with Google
            </Button>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body3" textAlign="center">
              © Your company {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
          transition: '0.4s',
          transitionDelay: '0.1s',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831)',
          },
        })}
      />
    </CssVarsProvider>
  );
}

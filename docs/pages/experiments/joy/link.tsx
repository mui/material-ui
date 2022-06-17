/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { keyframes } from '@mui/system';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import LocationOn from '@mui/icons-material/LocationOn';
import Groups from '@mui/icons-material/Groups';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const circulate = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const Loader = () => (
  <Box
    sx={{
      borderRadius: '50%',
      border: 4,
      borderColor: 'primary.lightBg',
      width: '1.25em',
      height: '1.25em',
      boxSizing: 'border-box',
      position: 'relative',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: -4,
        left: -4,
        width: '1.25em',
        height: '1.25em',
        borderRadius: '50%',
        border: '4px solid',
        borderColor: (theme) => `${theme.vars.palette.primary.softColor} transparent transparent`,
        animation: `${circulate} 1s ease infinite`,
        boxSizing: 'inherit',
      }}
    />
  </Box>
);

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </IconButton>
  );
};

export default function JoyButton() {
  const buttonProps = {
    variant: ['plain', 'outlined', 'soft', 'solid'],
    color: ['primary', 'neutral', 'danger', 'info', 'success', 'warning'],
    level: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'body3'],
    underline: ['hover', 'always', 'none'],
  } as const;
  return (
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3, pb: 4 }}>
          <ColorSchemePicker />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(300px, 1fr))',
            gap: 2,
            mt: 4,
            '& > div': {
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Box>
            <Link component="button" level="body2" startDecorator={<LocationOn />}>
              Miami, Florida
            </Link>
            <Link component="button" level="body2" startDecorator={<Groups fontSize="lg" />}>
              5 - 10 people
            </Link>
          </Box>
          <Box>
            <Link component="button" startDecorator={<LocationOn />}>
              Miami, Florida
            </Link>
            <Link component="button" startDecorator={<Groups fontSize="xl" />}>
              5 - 10 people
            </Link>
          </Box>
          <Box>
            <Link component="button" level="h5" startDecorator={<LocationOn />}>
              Miami, Florida
            </Link>
            <Link component="button" level="h5" startDecorator={<Groups fontSize="xl2" />}>
              5 - 10 people
            </Link>
          </Box>
          <Box>
            <Typography level="body2">
              Keep me updated about the new features and upcoming improvements (by doing this you
              accept the <Link endDecorator={<OpenInNew />}>terms</Link> and the{' '}
              <Link disabled startDecorator={<OpenInNew />}>
                privacy policy
              </Link>
              ).
            </Typography>
          </Box>
          <Box>
            <span>
              Keep me updated about the new features and upcoming improvements (by doing this you
              accept the{' '}
              <Link level="inherit" endDecorator={<OpenInNew />}>
                terms
              </Link>{' '}
              and the{' '}
              <Link level="inherit" startDecorator={<OpenInNew />}>
                privacy policy
              </Link>
              ).
            </span>
          </Box>
          <ul>
            <li>
              <Link startDecorator={<Person />}>Profile</Link>
            </li>
            <li>
              <Link startDecorator={<Settings />}>Settings</Link>
            </li>
            <li>
              <Link startDecorator={<Logout />}>Logout</Link>
            </li>
          </ul>
          <Box sx={{ my: 2 }}>
            <Link startDecorator={<Loader />} disabled my={2}>
              Processing...
            </Link>
            <Link
              color="neutral"
              endDecorator={
                <Box
                  sx={{
                    px: 0.5,
                    py: 0.25,
                    fontSize: 'xs',
                    fontWeight: 'md',
                    bgcolor: 'danger.500',
                    color: '#fff',
                    borderRadius: 'xs',
                  }}
                >
                  HIRING!
                </Box>
              }
              sx={{ ml: 1, color: 'primary.500' }}
            >
              Careers
            </Link>
          </Box>
          <Sheet variant="outlined" sx={{ borderRadius: 'xs', p: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Title</Typography>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            <Link href="#overlay" overlay>
              Learn more
            </Link>
          </Sheet>
          <Sheet
            variant="outlined"
            color="danger"
            sx={{
              borderRadius: 'md',
              p: 2,
              '--joy-palette-focusVisible': 'var(--joy-palette-danger-lightBg)',
              '&:hover': {
                boxShadow: 'md',
              },
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>Title</Typography>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            <Link href="#overlay" overlay>
              Learn more
            </Link>
          </Sheet>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {Object.entries(buttonProps).map(([propName, propValue]) => (
            <Box
              key={propName}
              sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
            >
              <Typography level="body2" sx={{ fontWeight: 'bold' }}>
                {propName}
              </Typography>
              {propValue.map((value) => (
                <Box
                  key={value}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Link {...{ [propName]: value }}>Link</Link>
                  <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                    {value || 'default'}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

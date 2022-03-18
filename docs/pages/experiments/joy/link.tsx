/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import LocationOn from '@mui/icons-material/LocationOn';
import Groups from '@mui/icons-material/Groups';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

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
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ '--Button-gutter': '0.25rem', minWidth: 'var(--Button-minHeight)' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default function JoyButton() {
  const buttonProps = {
    variant: ['text', 'outlined', 'light', 'contained'],
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
            <Link component="button" level="body2" startIcon={<LocationOn />}>
              Miami, Florida
            </Link>
            <Link component="button" level="body2" startIcon={<Groups fontSize="lg" />}>
              5 - 10 people
            </Link>
          </Box>
          <Box>
            <Link component="button" startIcon={<LocationOn />}>
              Miami, Florida
            </Link>
            <Link component="button" startIcon={<Groups fontSize="xl" />}>
              5 - 10 people
            </Link>
          </Box>
          <Box>
            <Link component="button" level="h5" startIcon={<LocationOn />}>
              Miami, Florida
            </Link>
            <Link component="button" level="h5" startIcon={<Groups fontSize="xl2" />}>
              5 - 10 people
            </Link>
          </Box>
          <Box>
            <Typography level="body2">
              Keep me updated about the new features and upcoming improvements (by doing this you
              accept the <Link endIcon={<OpenInNew />}>terms</Link> and the{' '}
              <Link startIcon={<OpenInNew />}>privacy policy</Link>).
            </Typography>
          </Box>
          <Box>
            <span>
              Keep me updated about the new features and upcoming improvements (by doing this you
              accept the{' '}
              <Link level="inherit" endIcon={<OpenInNew />}>
                terms
              </Link>{' '}
              and the{' '}
              <Link level="inherit" startIcon={<OpenInNew />}>
                privacy policy
              </Link>
              ).
            </span>
          </Box>
          <ul>
            <li>
              <Link startIcon={<Person />}>Profile</Link>
            </li>
            <li>
              <Link startIcon={<Settings />}>Settings</Link>
            </li>
            <li>
              <Link startIcon={<Logout />}>Logout</Link>
            </li>
          </ul>
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

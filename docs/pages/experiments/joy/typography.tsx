import * as React from 'react';
import { keyframes } from '@mui/system';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import LocationOn from '@mui/icons-material/LocationOn';
import Groups from '@mui/icons-material/Groups';
import Outbound from '@mui/icons-material/Outbound';
import Info from '@mui/icons-material/InfoOutlined';

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
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default function JoyTypography() {
  return (
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3, pb: 4 }}>
          <ColorSchemePicker />
        </Box>
        {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'body3'] as const).map((level) => (
          <Typography gutterBottom level={level} key={level} startDecorator={<Info />}>
            {`${level} - typography`}
          </Typography>
        ))}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(300px, 1fr))',
            gap: 2,
            mt: 4,
          }}
        >
          <Box>
            <Typography level="body2" startDecorator={<LocationOn />}>
              Miami, Florida
            </Typography>
            <Typography level="body2" startDecorator={<Groups fontSize="lg" />}>
              5 - 10 people
            </Typography>
          </Box>
          <Box>
            <Typography startDecorator={<LocationOn />}>Miami, Florida</Typography>
            <Typography startDecorator={<Groups fontSize="xl" />}>5 - 10 people</Typography>
          </Box>
          <Box>
            <Typography level="h5" startDecorator={<LocationOn />}>
              Miami, Florida
            </Typography>
            <Typography level="h5" startDecorator={<Groups fontSize="xl2" />}>
              5 - 10 people
            </Typography>
          </Box>
        </Box>
        <Box sx={{ my: 2, maxWidth: 360 }}>
          <Typography sx={{ '--Typography-gap': '2px' }}>
            Keep me updated about the new features and upcoming improvements (by doing this you
            accept the{' '}
            <Typography textColor="primary.textColor" startDecorator={<Info />}>
              Terms
            </Typography>{' '}
            and the{' '}
            <Typography textColor="primary.textColor" endDecorator={<Outbound />}>
              privacy policy
            </Typography>
            ).
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography
            endDecorator={
              <Typography textColor="text.secondary" fontSize="sm">
                20
              </Typography>
            }
          >
            Home
          </Typography>
          <Typography
            endDecorator={
              <Typography textColor="text.secondary" fontSize="sm">
                7
              </Typography>
            }
          >
            Checklist
          </Typography>
          <Typography endDecorator={<Info fontSize="md" sx={{ color: 'warning.textColor' }} />}>
            Warning
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography startDecorator={<Loader />}>Processing...</Typography>
          <Typography
            startDecorator={
              <Box
                sx={{
                  bgcolor: 'success.500',
                  width: '0.5em',
                  height: '0.5em',
                  borderRadius: '50%',
                }}
              />
            }
          >
            Active
          </Typography>
          <Typography
            fontSize="xl4"
            lineHeight={1}
            startDecorator={
              <Typography fontSize="lg" textColor="text.secondary">
                $
              </Typography>
            }
            sx={{ alignItems: 'flex-start', my: 1 }}
          >
            25
          </Typography>
          <Typography
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
          >
            Careers
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography startDecorator={<Info />} sx={{ alignItems: 'flex-start' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography
            variant="soft"
            color="primary"
            startDecorator={<Info />}
            py={1}
            px={1}
            borderRadius="xs"
            display="inline-flex"
          >
            This is a test.
          </Typography>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

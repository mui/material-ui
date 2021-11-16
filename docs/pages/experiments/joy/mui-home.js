import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import MuiTypography from '@mui/material/Typography';
import { GlobalStyles } from '@mui/styled-engine';
import { styled, CssVarsProvider, useColorScheme } from '@mui/joy/styles';

const Moon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M7.5 6.375C7.5 4.93969 7.71141 3.48703 8.25 2.25C4.66734 3.80953 2.25 7.46812 2.25 11.625C2.25 17.2167 6.78328 21.75 12.375 21.75C16.5319 21.75 20.1905 19.3327 21.75 15.75C20.513 16.2886 19.0603 16.5 17.625 16.5C12.0333 16.5 7.5 11.9667 7.5 6.375Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const System = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M12 21.75C6.615 21.75 2.25 17.385 2.25 12C2.25 6.615 6.615 2.25 12 2.25V21.75Z"
      fill="currentColor"
    />
  </svg>
);

const Sun = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M12 2.25V4.5M12 19.5V21.75M18.8944 5.10562L17.3034 6.69656M6.69656 17.3034L5.10562 18.8944M21.75 12H19.5M4.5 12H2.25M18.8944 18.8944L17.3034 17.3034M6.69656 6.69656L5.10562 5.10562"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </svg>
);

const PushButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected }) => [
  {
    width: 36,
    height: 36,
    borderRadius: 18,
    cursor: selected ? 'initial' : 'pointer',
    border: 'none',
    background: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:focus-visible': theme.focus.default,
  },
  selected ? theme.variant.filled?.brand : theme.variant.text?.neutral,
]);

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
    <Box
      sx={(theme) => ({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: '48px',
        border: '1px solid',
        borderRadius: '24px',
        ...theme.variant.outlined.brand,
      })}
    >
      <Box sx={{ display: 'flex', gap: '8px', p: '6px' }}>
        {['system', 'light', 'dark'].map((modeId) => {
          const icons = {
            system: System,
            light: Sun,
            dark: Moon,
          };
          const Icon = icons[modeId];
          return (
            <PushButton
              key={modeId}
              selected={mode === modeId}
              onClick={() => {
                setMode(modeId);
              }}
            >
              <Icon />
            </PushButton>
          );
        })}
      </Box>
    </Box>
  );
};

const IconButton = styled('button')(
  ({ theme, variant = 'filled', color = 'brand', roundness = 'default' }) => [
    {
      border: 0,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0.25rem',
      cursor: 'pointer',
      background: 'transparent',
      borderRadius: theme.borderRadius?.[roundness],
      '&:focus-visible': theme.focus.default,
    },
    theme.typography.button,
    theme.variant[variant]?.[color],
    theme.variant[`${variant}Hover`]?.[color],
    theme.variant[`${variant}Disabled`]?.[color],
  ],
);

const Card = styled('div')(
  ({ theme, variant = 'text', color = 'neutral', roundness = 'default', elevation }) => [
    {
      minWidth: 280,
      maxWidth: 360,
      minHeight: 280,
      borderRadius: theme.vars.borderRadius?.[roundness],
      backgroundColor: `var(--joy-variant-${variant}Bg, var(--joy-palette-bgNeutral-plain))`,
      ...(elevation && {
        boxShadow: theme.elevation?.[elevation],
      }),
    },
    theme.variant[variant]?.[color],
    variant === 'contained' && theme.variant.containedContext?.[color],
  ],
);

const Typography = styled(MuiTypography)(({ theme, variant = 'body' }) => [
  theme.typography[variant],
]);

const Avatar = styled('img')(
  ({ theme, variant = 'filled', color = 'brand', roundness = 'default' }) => [
    theme.typography.h5,
    {
      width: 40,
      height: 40,
      fontWeight: 700,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.vars.borderRadius?.[roundness],
    },
    theme.variant[variant]?.[color],
  ],
);

const TaskCard = ({ children }) => (
  <Card
    variant="contained"
    color="brand"
    elevation="xl"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      p: '25px',
      background:
        'linear-gradient(to right bottom, var(--joy-palette-brand-500), var(--joy-palette-brand-700) 120%)',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Moon width="16" height="16" />
      <Typography variant="caption" fontWeight={500} sx={{ ml: 0.5, mt: '1px' }}>
        March 25th
      </Typography>
    </Box>
    <Box sx={{ my: 'auto' }}>
      <Box
        sx={{
          width: 28,
          height: 28,
          bgcolor: '#fff',
          borderRadius: 0.75,
          p: '2px',
        }}
      >
        <System color="var(--joy-palette-brand-500)" />
      </Box>
      <Typography variant="h5" component="div" sx={{ mt: 1.5, fontWeight: 500 }}>
        Check the docs for getting every component API
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <Avatar
        imgProps={{ 'aria-labelledby': 'demo-task-card-assigne-name' }}
        src="/static/images/avatar/1-sm.jpeg"
        variant="outlined"
        sx={{ borderColor: '#fff' }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="caption"
          fontWeight={500}
          sx={{ color: 'var(--joy-palette-brand-200)' }}
        >
          Assigned to
        </Typography>
        <Typography variant="caption" id="demo-task-card-assigne-name" fontWeight={500}>
          Michael Scott
        </Typography>
      </Box>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: -0.5, mt: 0.5 }}>
      {/* <LinearProgress aria-label="Progress" variant="determinate" value={60} sx={{ flexGrow: 1 }} /> */}
      <Box
        sx={{
          borderRadius: 'var(--joy-borderRadius-default)',
          position: 'relative',
          flexGrow: 1,
          bgcolor: 'var(--joy-palette-brand-400)',
          height: '4px',
        }}
      >
        <Box
          sx={{
            borderRadius: 'inherit',
            bgcolor: 'var(--joy-palette-brand-50)',
            height: '100%',
            width: '60%',
          }}
        />
      </Box>
      <Typography variant="caption" sx={{ ml: 2, color: '#00C8FF' }}>
        <b>60%</b>
      </Typography>
    </Box>
    {children}
  </Card>
);

const PlayerCard = () => (
  <Card
    variant="outlined"
    sx={{ p: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, minHeight: 'unset' }}
  >
    <Box
      sx={{
        display: 'flex',
        mb: { xs: 1, sm: 0 },
        justifyContent: { xs: 'center', sm: 'flex-start' },
      }}
    >
      <img
        alt="Beside Myself album cover"
        style={{ borderRadius: 5, objectFit: 'cover' }}
        src="/static/images/cards/basement-beside-myself.jpeg"
        width="124"
        height="124"
      />
    </Box>
    <Box sx={{ alignSelf: 'center', mx: 2 }}>
      <Typography sx={{ textAlign: { xs: 'center', sm: 'start' }, fontWeight: 500 }}>
        Ultraviolet
      </Typography>
      <Typography
        component="div"
        variant="detail"
        sx={{ textAlign: { xs: 'center', sm: 'start' } }}
      >
        Basement • Beside Myself
      </Typography>
      <Box sx={{ mt: '20px', gap: '20px', display: 'flex', alignItems: 'center' }}>
        <IconButton variant="outlined" roundness="lg" color="neutral">
          <Moon width="20" height="20" />
        </IconButton>
        <IconButton variant="outlined" roundness="lg" color="neutral">
          <System width="20" height="20" />
        </IconButton>
        <IconButton variant="outlined" roundness="lg" color="neutral">
          <Sun width="20" height="20" />
        </IconButton>
      </Box>
    </Box>
  </Card>
);

export default function MuiHome() {
  return (
    <CssVarsProvider
      defaultMode="system"
      theme={{
        fontFamily: {
          sans: '"IBM Plex Sans"',
        },
        borderRadius: {
          default: '10px',
        },
        typography: {
          pxToRem: (size) => `${size / 16}rem`,
        },
        colorSchemes: {
          light: {
            palette: {
              brand: {
                50: '#F0F7FF',
                100: '#C2E0FF',
                200: '#A5D8FF',
                300: '#66B2FF',
                400: '#3399FF',
                500: '#007FFF',
                600: '#0072E5',
                700: '#0059B2',
                800: '#004C99',
                900: '#003A75',
              },
            },
          },
          dark: {
            palette: {
              brand: {
                50: '#E2EDF8',
                100: '#CEE0F3',
                200: '#91B9E3',
                300: '#5090D3',
                400: '#265D97',
                500: '#1E4976',
                600: '#173A5E',
                700: '#132F4C',
                800: '#001E3C',
                900: '#0A1929',
              },
              neutral: {
                outlinedBg: 'var(--joy-palette-brand-800)',
                outlinedBorder: 'var(--joy-palette-brand-500)',
                outlinedHoverBg: 'var(--joy-palette-brand-700)',
              },
              text: {
                content: '#fff',
              },
            },
          },
        },
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          body: {
            margin: 0,
            backgroundColor: 'var(--joy-palette-bgNeutral-transparency)',
            color: 'var(--joy-palette-text-content)',
            ...theme.typography.body,
            '*': {
              boxSizing: 'border-box',
            },
            '&[data-mui-color-scheme="dark"]': {
              backgroundColor: 'var(--joy-palette-brand-900)',
            },
          },
        })}
      />
      <Box
        sx={{
          minHeight: 56,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ColorSchemePicker />
      </Box>
      <Container sx={{ py: '40px', '& > div': { display: 'inline-flex' } }}>
        <Stack spacing={4} sx={{ '& > .MuiPaper-root': { maxWidth: 'none' } }}>
          <TaskCard />
          <PlayerCard />
        </Stack>
      </Container>
    </CssVarsProvider>
  );
}

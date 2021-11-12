import * as React from 'react';
import Head from 'next/head';
import { GlobalStyles } from '@mui/styled-engine';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled, CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';

const PushButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected }) => ({
  width: 36,
  height: 36,
  borderRadius: 18,
  cursor: selected ? 'initial' : 'pointer',
  border: 'none',
  background: 'transparent',
  // border: '1px solid',
  // color: selected ? 'var(--joy-palette-main)' : 'var(--joy-palette-text-content)',
  // borderColor: selected ? 'var(--joy-palette-divider)' : 'transparent',
  // backgroundColor: selected ? 'var(--joy-palette-selected)' : 'transparent',
  // '&:hover, &:focus-visible': {
  //   backgroundColor: 'var(--joy-palette-selected)',
  // },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...(selected ? theme.variant.filled.brand : theme.variant.textInteractive.neutral),
}));

const Button = styled('button')(({ theme, variant = 'containedInteractive', color = 'brand' }) => [
  {
    minHeight: 48,
    border: 0,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem 2rem',
    borderRadius: '24px',
    cursor: 'pointer',
    background: 'transparent',
  },
  theme.typography.button,
  theme.variant[variant]?.[color],
]);

const IconButton = styled('button')(({ theme, variant = 'filledInteractive', color = 'brand' }) => [
  {
    border: 0,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.25rem',
    borderRadius: '50%',
    cursor: 'pointer',
    background: 'transparent',
  },
  theme.typography.button,
  theme.variant[variant]?.[color],
]);

const Input = styled('input')(({ theme }) => [
  {
    minHeight: 48,
    border: '2px solid',
    borderRadius: '4px',
    backgroundColor: theme.vars.palette.inverse,
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    '&::placeholder': {
      color: theme.vars.palette.text.detail,
    },
  },
  theme.typography.body,
  theme.variant.outlinedInteractive.neutral,
]);

const Typography = styled('p', {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'as',
})(({ theme, variant = 'body' }) => ({
  ...theme.typography[variant],
}));

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

const Close = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M17.25 6.75L6.75 17.25M17.25 17.25L6.75 6.75L17.25 17.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
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
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: '48px',
        border: '1px solid',
        borderColor: 'var(--joy-palette-divider)',
        borderRadius: '24px',
        bgcolor: 'var(--joy-palette-inverse)',
      }}
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

const Chip = styled('div')(({ theme, variant = 'outlined', color = 'neutral' }) => [
  {
    borderRadius: '24px',
    minHeight: '40px',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    backgroundColor: theme.vars.palette.inverse,
  },
  theme.variant[variant]?.[color],
]);

const ListItemButton = styled('button')(
  ({ theme, variant = 'textInteractive', color = 'neutral' }) => [
    {
      backgroundColor: 'transparent',
      border: 'none',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: variant.endsWith('Interactive') ? 'pointer' : 'default',
      '& > svg': {
        marginRight: '16px',
      },
    },
    theme.typography.body,
    theme.variant[variant]?.[color],
  ],
);

const Card = styled('div')(({ theme, variant = 'text', color = 'neutral' }) => [
  {
    padding: '2rem',
    display: 'flex',
    gap: '1.5rem',
    backgroundColor: theme.vars.palette.inverse,
    borderRadius: '1rem',
  },
  theme.variant[variant]?.[color],
]);

const Image = styled('div')(({ theme, variant = 'filled', color = 'brand' }) => [
  {
    minWidth: '100px',
    minHeight: '100px',
    borderRadius: '4px',
  },
  theme.variant[variant]?.[color],
]);

export default function JoyDashboard() {
  return (
    <CssVarsProvider
      defaultMode="system"
      theme={{
        colorSchemes: {
          light: {
            palette: {
              brand: {
                textColor: 'var(--joy-palette-brand-600)',
                textHoverBg: 'var(--joy-palette-neutral-100)',
                textActiveBg: 'var(--joy-palette-neutral-200)',
                textDisabledColor: 'var(--joy-palette-neutral-300)',
                outlinedBorder: 'var(--joy-palette-neutral-300)',
                outlinedDisabledBorder: 'var(--joy-palette-neutral-200)',
                filledColor: 'var(--joy-palette-brand-700)',
                filledBg: 'var(--joy-palette-brand-100)',
                filledHoverBg: 'var(--joy-palette-brand-200)',
                filledActiveBg: 'var(--joy-palette-brand-300)',
                filledDisabledColor: 'var(--joy-palette-brand-400)',
                filledDisableBg: 'var(--joy-palette-brand-50)',
                containedColor: '#fff',
                containedBg: 'var(--joy-palette-brand-600)',
                containedHoverBg: 'var(--joy-palette-brand-700)',
                containedActiveBg: 'var(--joy-palette-brand-500)',
                containedDisabledBg: 'var(--joy-palette-brand-300)',
              },
              neutral: {
                textColor: 'var(--joy-palette-neutral-600)',
                textHoverBg: 'var(--joy-palette-neutral-100)',
                textActiveBg: 'var(--joy-palette-neutral-200)',
                textDisabledColor: 'var(--joy-palette-neutral-300)',
                outlinedBorder: 'var(--joy-palette-neutral-300)',
                outlinedDisabledBorder: 'var(--joy-palette-neutral-200)',
                filledColor: 'var(--joy-palette-neutral-700)',
                filledBg: 'var(--joy-palette-neutral-100)',
                filledHoverBg: 'var(--joy-palette-neutral-200)',
                filledActiveBg: 'var(--joy-palette-neutral-300)',
                filledDisabledColor: 'var(--joy-palette-neutral-400)',
                filledDisableBg: 'var(--joy-palette-neutral-50)',
                containedColor: '#fff',
                containedBg: 'var(--joy-palette-neutral-600)',
                containedHoverBg: 'var(--joy-palette-neutral-700)',
                containedActiveBg: 'var(--joy-palette-neutral-500)',
                containedDisabledBg: 'var(--joy-palette-neutral-300)',
              },
              divider: 'var(--joy-palette-neutral-200)',
              selected: 'var(--joy-palette-neutral-100)',
              inverse: '#fff',
              main: 'var(--joy-palette-brand-600)',
              mainContrast: '#fff',
              surface: '#fff',
              bgNeutral: {
                transparency: 'var(--joy-palette-brand-50)',
              },
            },
          },
          dark: {
            palette: {
              brand: {
                textColor: 'var(--joy-palette-brand-200)',
                textHoverBg: 'var(--joy-palette-neutral-800)',
                textActiveBg: 'var(--joy-palette-neutral-700)',
                textDisabledColor: 'var(--joy-palette-neutral-500)',
                outlinedBorder: 'var(--joy-palette-neutral-700)',
                outlinedDisabledBorder: 'var(--joy-palette-neutral-800)',
                filledColor: 'var(--joy-palette-brand-200)',
                filledBg: 'var(--joy-palette-brand-800)',
                filledHoverBg: 'var(--joy-palette-brand-700)',
                filledActiveBg: 'var(--joy-palette-brand-600)',
                filledDisabledColor: 'var(--joy-palette-brand-500)',
                filledDisableBg: 'var(--joy-palette-brand-800)',
                containedColor: '#fff',
                containedBg: 'var(--joy-palette-brand-600)',
                containedHoverBg: 'var(--joy-palette-brand-700)',
                containedActiveBg: 'var(--joy-palette-brand-500)',
                containedDisabledBg: 'var(--joy-palette-brand-300)',
              },
              neutral: {
                textColor: 'var(--joy-palette-neutral-200)',
                textHoverBg: 'var(--joy-palette-neutral-800)',
                textActiveBg: 'var(--joy-palette-neutral-700)',
                textDisabledColor: 'var(--joy-palette-neutral-500)',
                outlinedBorder: 'var(--joy-palette-neutral-700)',
                outlinedDisabledBorder: 'var(--joy-palette-neutral-800)',
                filledColor: 'var(--joy-palette-neutral-200)',
                filledBg: 'var(--joy-palette-neutral-800)',
                filledHoverBg: 'var(--joy-palette-neutral-700)',
                filledActiveBg: 'var(--joy-palette-neutral-600)',
                filledDisabledColor: 'var(--joy-palette-neutral-500)',
                filledDisableBg: 'var(--joy-palette-neutral-800)',
                containedColor: '#fff',
                containedBg: 'var(--joy-palette-neutral-600)',
                containedHoverBg: 'var(--joy-palette-neutral-700)',
                containedActiveBg: 'var(--joy-palette-neutral-500)',
                containedDisabledBg: 'var(--joy-palette-neutral-300)',
              },
              divider: 'var(--joy-palette-neutral-600)',
              selected: 'var(--joy-palette-neutral-800)',
              inverse: 'var(--joy-palette-neutral-900)',
              main: 'var(--joy-palette-brand-400)',
              mainContrast: '#fff',
              surface: '#000',
            },
          },
        },
        variant: {
          text: {
            brand: {
              color: 'var(--joy-variant-brand-textColor, var(--joy-palette-brand-textColor))',
            },
            neutral: {
              color: 'var(--joy-palette-neutral-textColor)',
            },
          },
          textInteractive: {
            brand: {
              color: 'var(--joy-variant-brand-textColor, var(--joy-palette-brand-textColor))',
              '&:hover': {
                backgroundColor:
                  'var(--joy-variant-brand-textHoverBg, var(--joy-palette-brand-textHoverBg))',
              },
              '&:active': {
                backgroundColor:
                  'var(--joy-variant-brand-textActiveBg, var(--joy-palette-brand-textActiveBg))',
              },
              '&.Mui-disabled': {
                color: 'var(--joy-palette-brand-textDisabledColor)',
              },
            },
            neutral: {
              color: 'var(--joy-palette-neutral-textColor)',
              '&:hover': {
                backgroundColor: 'var(--joy-palette-neutral-textHoverBg)',
              },
              '&:active': {
                backgroundColor: 'var(--joy-palette-neutral-textActiveBg)',
              },
              '&.Mui-disabled': {
                color: 'var(--joy-palette-neutral-textDisabledColor)',
              },
            },
          },
          outlined: {
            brand: {
              color: 'var(--joy-variant-brand-outlinedColor, var(--joy-palette-brand-textColor))',
              border: '1px solid',
              borderColor:
                'var(--joy-variant-brand-outlinedBorder, var(--joy-palette-brand-outlinedBorder))',
            },
            neutral: {
              color: 'var(--joy-palette-neutral-textColor)',
              border: '1px solid',
              borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
            },
          },
          outlinedInteractive: {
            brand: {
              color: 'var(--joy-variant-brand-outlinedColor, var(--joy-palette-brand-textColor))',
              border: '1px solid',
              borderColor:
                'var(--joy-variant-brand-outlinedBorder, var(--joy-palette-brand-outlinedBorder))',
              '&:hover': {
                backgroundColor:
                  'var(--joy-variant-brand-outlinedHoverBg, var(--joy-palette-brand-textHoverBg))',
              },
              '&:active': {
                backgroundColor:
                  'var(--joy-variant-brand-outlinedActiveBg, var(--joy-palette-brand-textActiveBg))',
              },
              '&.Mui-disabled': {
                color: 'var(--joy-palette-brand-textDisabledColor)',
                borderColor: 'var(--joy-palette-brand-outlinedDisabledBorder)',
              },
            },
            neutral: {
              color: 'var(--joy-palette-neutral-textColor)',
              border: '1px solid',
              borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
              '&:hover': {
                backgroundColor: 'var(--joy-palette-neutral-textHoverBg)',
              },
              '&:active': {
                backgroundColor: 'var(--joy-palette-neutral-textActiveBg)',
              },
              '&.Mui-disabled': {
                color: 'var(--joy-palette-neutral-textDisabledColor)',
                borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
              },
            },
          },
          filled: {
            brand: {
              color: 'var(--joy-variant-brand-filledColor, var(--joy-palette-brand-filledColor))',
              backgroundColor:
                'var(--joy-variant-brand-filledBg, var(--joy-palette-brand-filledBg))',
            },
            neutral: {
              color: 'var(--joy-palette-neutral-filledColor)',
              backgroundColor: 'var(--joy-palette-neutral-filledBg)',
            },
          },
          filledInteractive: {
            brand: {
              color: 'var(--joy-variant-brand-filledColor, var(--joy-palette-brand-filledColor))',
              backgroundColor:
                'var(--joy-variant-brand-filledBg, var(--joy-palette-brand-filledBg))',
              '&:hover': {
                backgroundColor:
                  'var(--joy-variant-brand-filledHoverBg, var(--joy-palette-brand-filledHoverBg))',
              },
              '&:active': {
                backgroundColor:
                  'var(--joy-variant-brand-filledActiveBg, var(--joy-palette-brand-filledActiveBg))',
              },
              '&.Mui-disabled': {
                color: 'var(--joy-palette-brand-filledDisabledColor)',
                backgroundColor: 'var(--joy-palette-brand-filledDisabledBg)',
              },
            },
            neutral: {
              color: 'var(--joy-palette-neutral-filledColor)',
              backgroundColor: 'var(--joy-palette-neutral-filledBg)',
              '&:hover': {
                backgroundColor: 'var(--joy-palette-neutral-filledHoverBg)',
              },
              '&:active': {
                backgroundColor: 'var(--joy-palette-neutral-filledActiveBg)',
              },
              '&.Mui-disabled': {
                color: 'var(--joy-palette-neutral-filledDisabledColor)',
                backgroundColor: 'var(--joy-palette-neutral-filledDisabledBg)',
              },
            },
          },
          contained: {
            brand: {
              color: 'var(--joy-palette-brand-containedColor)',
              backgroundColor: 'var(--joy-palette-brand-containedBg)',
              '--joy-variant-brand-textColor': '#fff',
              '--joy-variant-brand-textHoverBg': 'var(--joy-palette-brand-600)',
              '--joy-variant-brand-textActiveBg': 'var(--joy-palette-brand-700)',
              '--joy-variant-brand-outlinedColor': '#fff',
              '--joy-variant-brand-outlinedBorder': 'var(--joy-palette-brand-400)',
              '--joy-variant-brand-outlinedHoverBg': 'var(--joy-palette-brand-600)',
              '--joy-variant-brand-outlinedActiveBg': 'var(--joy-palette-brand-700)',
              '--joy-variant-brand-filledColor': '#fff',
              '--joy-variant-brand-filledBg': 'var(--joy-palette-brand-500)',
              '--joy-variant-brand-filledHoverBg': 'var(--joy-palette-brand-500)',
              '--joy-variant-brand-filledActiveBg': 'var(--joy-palette-brand-700)',
            },
            neutral: {
              color: 'var(--joy-palette-neutral-containedColor)',
              backgroundColor: 'var(--joy-palette-neutral-containedBg)',
            },
          },
          containedInteractive: {
            brand: {
              color: 'var(--joy-palette-brand-containedColor)',
              backgroundColor: 'var(--joy-palette-brand-containedBg)',
              '&:hover': {
                backgroundColor: 'var(--joy-palette-brand-containedHoverBg)',
              },
              '&:active': {
                backgroundColor: 'var(--joy-palette-brand-containedActiveBg)',
              },
              '&.Mui-disabled': {
                backgroundColor: 'var(--joy-palette-brand-containedDisabledBg)',
              },
            },
            neutral: {
              color: 'var(--joy-palette-neutral-containedColor)',
              backgroundColor: 'var(--joy-palette-neutral-containedBg)',
              '&:hover': {
                backgroundColor: 'var(--joy-palette-neutral-containedHoverBg)',
              },
              '&:active': {
                backgroundColor: 'var(--joy-palette-neutral-containedActiveBg)',
              },
              '&.Mui-disabled': {
                backgroundColor: 'var(--joy-palette-neutral-containedDisabledBg)',
              },
            },
          },
        },
      }}
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

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
          },
        })}
      />
      <Box sx={{ display: 'flex' }}>
        <Box
          component="nav"
          sx={{
            width: 256,
          }}
        >
          <Box
            sx={{
              width: 256,
              minHeight: '100vh',
              p: '20px',
              display: 'flex',
              flexDirection: 'column',
              borderRight: '1px solid',
              borderColor: 'var(--joy-palette-divider)',
              bgcolor: 'var(--joy-palette-surface)',
              position: 'fixed',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <SvgMuiLogo />
            </Box>
            <br />
            <Box
              component="ul"
              sx={{ display: 'flex', flexDirection: 'column', gap: '8px', p: 0, listStyle: 'none' }}
            >
              <li>
                <ListItemButton>
                  <Moon /> Dashboard
                </ListItemButton>
              </li>
              <li>
                <ListItemButton variant="filled" color="brand">
                  <Sun /> Job Board
                </ListItemButton>
              </li>
              <li>
                <ListItemButton>
                  <System /> Schedule
                </ListItemButton>
              </li>
            </Box>
            <br />
            <Card variant="contained" color="brand" sx={{ flexDirection: 'column', p: '1.5rem' }}>
              <Typography variant="h5" component="div" sx={{ my: 0, color: 'inherit' }}>
                <b>Get Upgrade</b>
              </Typography>
              <Typography sx={{ my: 0, color: 'inherit' }}>
                Step to the next level, <br /> with more features.
              </Typography>
              <Button variant="filledInteractive">Learn more</Button>
              <Button variant="outlinedInteractive">Skip</Button>
              <Button variant="textInteractive">Pause</Button>
            </Card>
            <br />
            <Button
              variant="textInteractive"
              color="neutral"
              sx={{
                width: '100%',
                mt: 'auto',
                justifyContent: 'flex-start',
                '& > svg': { mr: '1rem' },
              }}
            >
              <Sun />
              Logout
            </Button>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            component="header"
            sx={{
              borderBottom: '1px solid',
              borderColor: 'var(--joy-palette-divider)',
              bgcolor: 'var(--joy-palette-surface)',
              position: 'sticky',
              top: 0,
            }}
          >
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: 64,
              }}
            >
              <Box />
              <ColorSchemePicker />
            </Container>
          </Box>
          <Box component="main">
            <Container sx={{ py: '40px', px: { md: '100px' } }}>
              <Typography variant="h4" as="h1" sx={{ mb: '16px' }}>
                Job Board
              </Typography>
              <Box sx={{ my: '16px', display: 'flex', gap: '20px' }}>
                <Input placeholder="Search by job title, company, keywords" sx={{ width: '50%' }} />
                <Input placeholder="Anywhere" sx={{ flexGrow: 1 }} />
                <Input placeholder="Filter" sx={{ flexGrow: 1 }} />
              </Box>
              <Box sx={{ my: '16px', display: 'flex', gap: '20px' }}>
                <Chip>
                  <IconButton sx={{ mr: '6px', ml: '-6px' }}>
                    <Close width="20" height="20" />
                  </IconButton>
                  Design
                </Chip>
                <Chip>
                  <IconButton sx={{ mr: '6px', ml: '-6px' }}>
                    <Close width="20" height="20" />
                  </IconButton>
                  Regular
                </Chip>
                <Chip>
                  <IconButton sx={{ mr: '6px', ml: '-6px' }}>
                    <Close width="20" height="20" />
                  </IconButton>
                  Full time
                </Chip>
                <Chip>
                  <IconButton sx={{ mr: '6px', ml: '-6px' }}>
                    <Close width="20" height="20" />
                  </IconButton>
                  B2B
                </Chip>
                <Button
                  variant="textInteractive"
                  color="neutral"
                  sx={{ minHeight: 40, px: '1rem' }}
                >
                  Clear All
                </Button>
              </Box>
              <Box
                sx={{ mt: '64px', mb: '20px', display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography>
                  We&apos;ve found{' '}
                  <Typography as="span" color="brand">
                    523
                  </Typography>{' '}
                  jobs!
                </Typography>
                <Typography>
                  Sort by:{' '}
                  <Typography as="span" color="brand">
                    Date
                  </Typography>{' '}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[...Array(5)].map((_, index) => (
                  <Card key={index} variant="textInteractive" color="brand">
                    <Image />
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Typography
                          variant="h4"
                          as="div"
                          sx={{ ...(index === 1 && { color: 'inherit' }) }}
                        >
                          UX Designer
                        </Typography>
                        <Chip
                          variant="filled"
                          color="brand"
                          sx={{
                            fontSize: '0.875rem',
                            py: '0.25rem',
                            borderRadius: '2px',
                            minHeight: '24px',
                          }}
                        >
                          Remote
                        </Chip>
                        <Chip
                          variant="outlined"
                          color="neutral"
                          sx={{
                            fontSize: '0.875rem',
                            py: '0.25rem',
                            borderRadius: '4px',
                            minHeight: '24px',
                          }}
                        >
                          Sketch
                        </Chip>
                      </Box>
                      <Typography sx={{ ...(index === 1 && { color: 'inherit' }) }}>
                        Dropbox — Warszawa
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="headerSubtitle" as="div">
                        8.8 - 13.7k PLN
                      </Typography>
                      <Typography sx={{ ...(index === 1 && { color: 'inherit' }) }}>
                        2 days ago
                      </Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

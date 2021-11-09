import * as React from 'react';
import Head from 'next/head';
import { GlobalStyles } from '@mui/styled-engine';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  styled,
  CssVarsProvider,
  useTheme,
  useColorScheme,
  JoyTheme,
  SupportedColorScheme,
  TypographySystems,
} from '@mui/joy/styles';
import colors from '@mui/joy/colors';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';

declare module '@mui/joy/styles' {
  interface ColorSchemeOverrides {
    lightRed: true;
    darkRed: true;
    lightYellow: true;
    darkYellow: true;
    lightGreen: true;
    darkGreen: true;
  }

  interface Palette {
    main: string;
    mainContrast: string;
    divider: string;
    selected: string;
    inverse: string;
  }
}

const PushButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ color?: string; selected?: boolean }>(({ selected }) => ({
  width: 36,
  height: 36,
  borderRadius: 18,
  cursor: selected ? 'initial' : 'pointer',
  border: '1px solid',
  color: selected ? 'var(--joy-palette-main)' : 'var(--joy-palette-text-content)',
  borderColor: selected ? 'var(--joy-palette-divider)' : 'transparent',
  backgroundColor: selected ? 'var(--joy-palette-selected)' : 'transparent',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover, &:focus-visible': {
    backgroundColor: 'var(--joy-palette-selected)',
  },
}));

const Button = styled('button')(({ theme }) => ({
  ...theme.typography.button,
  minHeight: 48,
  border: 0,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.5rem 2rem',
  backgroundColor: theme.vars.palette.main,
  color: theme.vars.palette.mainContrast,
  borderRadius: '24px',
}));

const Input = styled('input')(({ theme }) => ({
  ...theme.typography.body,
  minHeight: 48,
  border: '2px solid',
  borderColor: theme.vars.palette.divider,
  borderRadius: '24px',
  backgroundColor: theme.vars.palette.inverse,
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  color: theme.vars.palette.text.content,
  '&::placeholder': {
    color: theme.vars.palette.text.detail,
  },
}));

const Typography = styled('p', {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'as',
})<{
  variant?: keyof TypographySystems;
}>(({ theme, variant = 'body' }) => ({
  ...theme.typography[variant],
}));

const Moon = (props: React.SVGProps<SVGSVGElement>) => (
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

const System = (props: React.SVGProps<SVGSVGElement>) => (
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

const Sun = (props: React.SVGProps<SVGSVGElement>) => (
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

const ColorSchemePicker = () => {
  const theme = useTheme();
  const { mode, setMode, colorScheme, setColorScheme } = useColorScheme();
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
        {Object.entries(theme.colorSchemes)
          .filter(([name]) => name.startsWith('light'))
          .map(([name, colorSystem]) => (
            <PushButton
              key={name}
              selected={name === colorScheme || name.replace('light', 'dark') === colorScheme}
              onClick={() =>
                setColorScheme({
                  light: name as SupportedColorScheme,
                  dark: name.replace('light', 'dark') as SupportedColorScheme,
                })
              }
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: (() => {
                    if (name === 'lightYellow') {
                      return colorSystem.palette.brand[200];
                    }
                    if (name === 'lightGreen') {
                      return colorSystem.palette.brand[300];
                    }
                    return colorSystem.palette.brand[500];
                  })(),
                }}
              />
            </PushButton>
          ))}
      </Box>
      <Box
        sx={{
          alignSelf: 'stretch',
          backgroundColor: 'var(--joy-palette-divider)',
          width: '1px',
          mx: '16px',
        }}
      />
      <Box sx={{ display: 'flex', gap: '8px', p: '6px' }}>
        {(['system', 'light', 'dark'] as const).map((modeId) => {
          const icons = {
            system: System,
            light: Sun,
            dark: Moon,
          };
          const Icon = icons[modeId];
          return (
            <PushButton
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

export default function Joy() {
  return (
    <CssVarsProvider
      defaultMode="system"
      theme={{
        colorSchemes: {
          light: {
            palette: {
              divider: 'var(--joy-palette-neutral-200)',
              selected: 'var(--joy-palette-neutral-100)',
              inverse: '#fff',
              main: 'var(--joy-palette-brand-600)',
              mainContrast: '#fff',
            },
          },
          dark: {
            palette: {
              divider: 'var(--joy-palette-neutral-600)',
              selected: 'var(--joy-palette-neutral-800)',
              inverse: 'var(--joy-palette-neutral-900)',
              main: 'var(--joy-palette-brand-400)',
              mainContrast: '#fff',
            },
          },
          lightRed: {
            palette: {
              brand: colors.red,
              neutral: colors.grey,
              text: {
                heading: 'var(--joy-palette-neutral-900)',
                headingIntro: 'var(--joy-palette-brand-300)',
                content: 'var(--joy-palette-neutral-600)',
                detail: 'var(--joy-palette-neutral-500)',
                overline: 'var(--joy-palette-neutral-500)',
              },
              bgNeutral: {
                transparency: 'var(--joy-palette-neutral-100)',
                plain: 'var(--joy-palette-neutral-100)',
              },
              divider: 'var(--joy-palette-neutral-200)',
              selected: 'var(--joy-palette-neutral-100)',
              inverse: '#fff',
              main: 'var(--joy-palette-brand-500)',
              mainContrast: '#fff',
            },
          },
          darkRed: {
            palette: {
              brand: colors.red,
              neutral: colors.grey,
              text: {
                heading: '#fff',
                headingIntro: 'var(--joy-palette-brand-300)',
                content: 'var(--joy-palette-neutral-200)',
                detail: 'var(--joy-palette-neutral-300)',
                overline: 'var(--joy-palette-neutral-500)',
              },
              bgNeutral: {
                transparency: 'var(--joy-palette-neutral-900)',
                plain: 'var(--joy-palette-neutral-900)',
              },
              divider: 'var(--joy-palette-neutral-600)',
              selected: 'var(--joy-palette-neutral-800)',
              inverse: 'var(--joy-palette-neutral-900)',
              main: 'var(--joy-palette-brand-500)',
              mainContrast: '#fff',
            },
          },
          lightYellow: {
            palette: {
              brand: colors.yellow,
              neutral: colors.grey,
              text: {
                heading: 'var(--joy-palette-neutral-900)',
                headingIntro: 'var(--joy-palette-brand-300)',
                content: 'var(--joy-palette-neutral-600)',
                detail: 'var(--joy-palette-neutral-500)',
                overline: 'var(--joy-palette-neutral-500)',
              },
              bgNeutral: {
                transparency: 'var(--joy-palette-neutral-100)',
                plain: 'var(--joy-palette-neutral-100)',
              },
              divider: 'var(--joy-palette-neutral-200)',
              selected: 'var(--joy-palette-neutral-100)',
              inverse: '#fff',
              main: 'var(--joy-palette-brand-400)',
              mainContrast: '#fff',
            },
          },
          darkYellow: {
            palette: {
              brand: colors.yellow,
              neutral: colors.grey,
              text: {
                heading: '#fff',
                headingIntro: 'var(--joy-palette-brand-300)',
                content: 'var(--joy-palette-neutral-200)',
                detail: 'var(--joy-palette-neutral-300)',
                overline: 'var(--joy-palette-neutral-500)',
              },
              bgNeutral: {
                transparency: 'var(--joy-palette-brand-900)',
                plain: 'var(--joy-palette-neutral-900)',
              },
              divider: 'var(--joy-palette-neutral-600)',
              selected: 'var(--joy-palette-neutral-800)',
              inverse: 'var(--joy-palette-neutral-900)',
              main: 'var(--joy-palette-brand-200)',
              mainContrast: 'var(--joy-palette-brand-700)',
            },
          },
          lightGreen: {
            palette: {
              brand: colors.green,
              neutral: colors.grey,
              text: {
                heading: 'var(--joy-palette-neutral-900)',
                headingIntro: 'var(--joy-palette-brand-300)',
                content: 'var(--joy-palette-neutral-600)',
                detail: 'var(--joy-palette-neutral-500)',
                overline: 'var(--joy-palette-neutral-500)',
              },
              bgNeutral: {
                transparency: 'var(--joy-palette-neutral-100)',
                plain: 'var(--joy-palette-neutral-100)',
              },
              divider: 'var(--joy-palette-neutral-200)',
              selected: 'var(--joy-palette-neutral-100)',
              inverse: '#fff',
              main: 'var(--joy-palette-brand-400)',
              mainContrast: '#fff',
            },
          },
          darkGreen: {
            palette: {
              brand: colors.green,
              neutral: colors.grey,
              text: {
                heading: '#fff',
                headingIntro: 'var(--joy-palette-brand-300)',
                content: 'var(--joy-palette-neutral-200)',
                detail: 'var(--joy-palette-neutral-300)',
                overline: 'var(--joy-palette-neutral-500)',
              },
              bgNeutral: {
                transparency: 'var(--joy-palette-brand-900)',
                plain: 'var(--joy-palette-neutral-900)',
              },
              divider: 'var(--joy-palette-neutral-600)',
              selected: 'var(--joy-palette-neutral-800)',
              inverse: 'var(--joy-palette-neutral-900)',
              main: 'var(--joy-palette-brand-300)',
              mainContrast: 'var(--joy-palette-brand-700)',
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
            ...(theme as JoyTheme).typography.body,
            '*': {
              boxSizing: 'border-box',
            },
          },
        })}
      />
      <Box component="header">
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: '60px',
            mb: '120px',
          }}
        >
          <SvgMuiLogo />
          <ColorSchemePicker />
        </Container>
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ maxWidth: 650 }}>
            <Typography variant="overline" as="div" sx={{ color: 'var(--joy-palette-main)' }}>
              Mui Presents
            </Typography>
            <Typography variant="h1" as="h1" sx={{ my: '16px' }}>
              A beautiful, flexible and open-source design system
            </Typography>
            <Typography variant="headingSubtitle" sx={{ maxWidth: 600, mb: '32px' }}>
              Joy is an open-source design system built on top of{' '}
              <span style={{ color: 'var(--joy-palette-main)' }}>MUIs unstyled components</span>,
              with a beautiful default theme that you can use right away or easily customize to make
              it your own.
            </Typography>
            <Typography sx={{ mb: '24px' }}>
              Development still in early stage. Subscribe to the newsletter for updates
            </Typography>
            <Box>
              <Input placeholder="Enter your email" sx={{ mr: '16px', minWidth: '240px' }} />
              <Button>Subscribe</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </CssVarsProvider>
  );
}

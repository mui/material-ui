import * as React from 'react';
import Head from 'next/head';
import { GlobalStyles } from '@mui/styled-engine';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
  },
  selected ? theme.pattern.filled?.brand : theme.pattern.text?.neutral,
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
        ...theme.pattern.outlined.brand,
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

const Button = styled('button')(({ theme, pattern = 'contained', color = 'brand' }) => [
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
  theme.pattern[pattern]?.[color],
  theme.pattern[`${pattern}Hover`]?.[color],
  theme.pattern[`${pattern}Active`]?.[color],
  theme.pattern[`${pattern}Disabled`]?.[color],
]);

const Badge = styled('span')(({ theme, pattern = 'contained', color = 'brand' }) => [
  {
    minHeight: 32,
    minWidth: 32,
    borderRadius: 4,
    padding: '0.25rem 0.5rem',
    textAlign: 'center',
  },
  theme.typography.caption,
  {
    fontWeight: 600,
    lineHeight: 1,
  },
  theme.pattern[pattern]?.[color],
]);

const Avatar = styled('div')(({ theme, pattern = 'filled', color = 'brand' }) => [
  theme.typography.h5,
  {
    width: 64,
    height: 64,
    borderRadius: '50%',
    fontWeight: 700,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  theme.pattern[pattern]?.[color],
]);

const Paper = styled('div')(
  ({ theme, pattern = 'text', color = 'neutral', enableContext = false }) => [
    {
      minWidth: 100,
      minHeight: 120,
      padding: '1rem',
      borderRadius: 4,
      backgroundColor: `var(--joy-pattern-${pattern}Bg, var(--joy-palette-bgNeutral-plain))`,
    },
    theme.pattern[pattern]?.[color],
    enableContext && pattern === 'contained' && theme.pattern.containedContext?.[color],
  ],
);

const List = styled('ul')(({ theme, pattern = 'text', color = 'neutral' }) => [
  {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: 4,
    listStyle: 'none',
    padding: '0.5rem 0.25rem',
    borderRadius: 4,
    margin: 0,
    backgroundColor: `var(--joy-pattern-${pattern}Bg, var(--joy-palette-bgNeutral-plain))`,
  },
  theme.pattern[pattern]?.[color],
]);

const ListItem = styled('li')(({ theme, pattern = 'text', color = 'neutral' }) => [
  theme.typography.body,
  {
    padding: '0.25rem 0.5rem',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  theme.pattern[pattern]?.[color],
  theme.pattern[`${pattern}Hover`]?.[color],
  theme.pattern[`${pattern}Disabled`]?.[color],
]);

const IconButton = styled('button')(({ theme, pattern = 'filled', color = 'brand' }) => [
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
  theme.pattern[pattern]?.[color],
  theme.pattern[`${pattern}Hover`]?.[color],
  theme.pattern[`${pattern}Disabled`]?.[color],
]);

const Input = styled('input')(({ theme, pattern = 'outlined', color = 'neutral' }) => [
  {
    minHeight: 48,
    maxWidth: '100%',
    border: '2px solid transparent',
    backgroundColor: `var(--joy-pattern-${pattern}Bg, var(--joy-palette-bgNeutral-plain))`,
    borderRadius: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    '&::placeholder': {
      opacity: 0.72,
      color: `var(--joy-pattern-${pattern}Color, ${theme.vars.palette.text.detail})`,
    },
  },
  theme.typography.body,
  theme.pattern[pattern]?.[color],
  theme.pattern[`${pattern}Hover`]?.[color],
  theme.pattern[`${pattern}Disabled`]?.[color],
]);

const Chip = styled('div')(({ theme, pattern = 'outlined', color = 'neutral' }) => [
  {
    borderRadius: '24px',
    minHeight: '40px',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
  },
  theme.pattern[pattern]?.[color],
]);

const Tabs = styled('div')(({ theme, pattern = 'text', color = 'neutral' }) => [
  {
    display: 'flex',
    gap: '0.5rem',
    padding: '0.25rem',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: 'var(--joy-palette-bgNeutral-plain)',
  },
  theme.pattern[pattern]?.[color],
  pattern === 'contained' && theme.pattern.containedContext?.[color],
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
              bgNeutral: {
                transparency: 'var(--joy-palette-neutral-50)',
                plain: '#fff',
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
                filledColor: 'var(--joy-palette-brand-100)',
                filledBg: 'var(--joy-palette-brand-800)',
                filledHoverBg: 'var(--joy-palette-brand-700)',
                filledActiveBg: 'var(--joy-palette-brand-600)',
                filledDisabledColor: 'var(--joy-palette-brand-500)',
                filledDisableBg: 'var(--joy-palette-brand-800)',
                containedColor: '#fff',
                containedBg: 'var(--joy-palette-brand-500)',
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
              bgNeutral: {
                plain: '#040404',
              },
            },
          },
        },
        pattern: {
          text: {
            brand: {
              color: 'var(--joy-pattern-textColor, var(--joy-palette-brand-textColor))',
            },
            neutral: {
              color: 'var(--joy-pattern-textColor, var(--joy-palette-neutral-textColor))',
            },
          },
          textHover: {
            brand: {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor:
                  'var(--joy-pattern-textHoverBg, var(--joy-palette-brand-textHoverBg))',
              },
            },
            neutral: {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor:
                  'var(--joy-pattern-textHoverBg, var(--joy-palette-neutral-textHoverBg))',
              },
            },
          },
          textActive: {
            brand: {
              '&:active': {
                backgroundColor:
                  'var(--joy-pattern-textActiveBg, var(--joy-palette-brand-textActiveBg))',
              },
            },
            neutral: {
              '&:active': {
                backgroundColor:
                  'var(--joy-pattern-textActiveBg, var(--joy-palette-neutral-textActiveBg))',
              },
            },
          },
          textDisabled: {
            brand: {
              '&.Mui-disabled': {
                color:
                  'var(--joy-pattern-textDisabledColor, var(--joy-palette-brand-textDisabledColor))',
              },
            },
            neutral: {
              '&.Mui-disabled': {
                color:
                  'var(--joy-pattern-textDisabledColor, var(--joy-palette-neutral-textDisabledColor))',
              },
            },
          },
          outlined: {
            brand: {
              color: 'var(--joy-pattern-outlinedColor, var(--joy-palette-brand-textColor))',
              border: '1px solid',
              borderColor:
                'var(--joy-pattern-outlinedBorder, var(--joy-palette-brand-outlinedBorder))',
            },
            neutral: {
              color: 'var(--joy-pattern-outlinedColor, var(--joy-palette-neutral-textColor))',
              border: '1px solid',
              borderColor:
                'var(--joy-pattern-outlinedBorder, var(--joy-palette-neutral-outlinedBorder))',
            },
          },
          outlinedHover: {
            brand: {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor:
                  'var(--joy-pattern-outlinedHoverBg, var(--joy-palette-brand-textHoverBg))',
              },
            },
            neutral: {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor:
                  'var(--joy-pattern-textHoverBg, var(--joy-palette-neutral-textHoverBg))',
              },
            },
          },
          outlinedActive: {
            brand: {
              '&:active': {
                backgroundColor:
                  'var(--joy-pattern-outlinedActiveBg, var(--joy-palette-brand-textActiveBg))',
              },
            },
            neutral: {
              '&:active': {
                backgroundColor:
                  'var(--joy-pattern-textActiveBg, var(--joy-palette-neutral-textActiveBg))',
              },
            },
          },
          outlinedDisabled: {
            brand: {
              '&.Mui-disabled': {
                color:
                  'var(--joy-pattern-textDisabledColor, var(--joy-palette-brand-textDisabledColor))',
                borderColor:
                  'var(--joy-pattern-outlinedDisabledBorder, var(--joy-palette-brand-outlinedDisabledBorder))',
              },
            },
            neutral: {
              '&.Mui-disabled': {
                color:
                  'var(--joy-pattern-textDisabledColor, var(--joy-palette-neutral-textDisabledColor))',
                borderColor:
                  'var(--joy-pattern-outlinedDisabledBorder, var(--joy-palette-neutral-outlinedDisabledBorder))',
              },
            },
          },
          filled: {
            brand: {
              color: 'var(--joy-pattern-filledColor, var(--joy-palette-brand-filledColor))',
              backgroundColor: 'var(--joy-pattern-filledBg, var(--joy-palette-brand-filledBg))',
            },
            neutral: {
              color: 'var(--joy-pattern-filledColor, var(--joy-palette-neutral-filledColor))',
              backgroundColor: 'var(--joy-pattern-filledBg, var(--joy-palette-neutral-filledBg))',
            },
          },
          filledHover: {
            brand: {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor:
                  'var(--joy-pattern-filledHoverBg, var(--joy-palette-brand-filledHoverBg))',
              },
            },
            neutral: {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor:
                  'var(--joy-pattern-filledHoverBg, var(--joy-palette-neutral-filledHoverBg))',
              },
            },
          },
          filledActive: {
            brand: {
              '&:active': {
                backgroundColor:
                  'var(--joy-pattern-filledActiveBg, var(--joy-palette-brand-filledActiveBg))',
              },
            },
            neutral: {
              '&:active': {
                backgroundColor:
                  'var(--joy-pattern-filledActiveBg, var(--joy-palette-neutral-filledActiveBg))',
              },
            },
          },
          filledDisabled: {
            brand: {
              '&.Mui-disabled': {
                color:
                  'var(--joy-pattern-filledDisabledColor, var(--joy-palette-brand-filledDisabledColor))',
                backgroundColor:
                  'var(--joy-pattern-filledDisabledBg, var(--joy-palette-brand-filledDisabledBg))',
              },
            },
            neutral: {
              '&.Mui-disabled': {
                color:
                  'var(--joy-pattern-filledDisabledColor, var(--joy-palette-neutral-filledDisabledColor))',
                backgroundColor:
                  'var(--joy-pattern-filledDisabledBg, var(--joy-palette-neutral-filledDisabledBg))',
              },
            },
          },
          contained: {
            brand: {
              color: 'var(--joy-palette-brand-containedColor)',
              backgroundColor: 'var(--joy-palette-brand-containedBg)',
            },
            neutral: {
              color: 'var(--joy-palette-neutral-containedColor)',
              backgroundColor: 'var(--joy-palette-neutral-containedBg)',
            },
          },
          containedHover: {
            brand: {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'var(--joy-palette-brand-containedHoverBg)',
              },
            },
            neutral: {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'var(--joy-palette-neutral-containedHoverBg)',
              },
            },
          },
          containedActive: {
            brand: {
              '&:active': {
                backgroundColor: 'var(--joy-palette-brand-containedActiveBg)',
              },
            },
            neutral: {
              '&:active': {
                backgroundColor: 'var(--joy-palette-neutral-containedActiveBg)',
              },
            },
          },
          containedDisabled: {
            brand: {
              '&.Mui-disabled': {
                backgroundColor: 'var(--joy-palette-brand-containedDisabledBg)',
              },
            },
            neutral: {
              '&.Mui-disabled': {
                backgroundColor: 'var(--joy-palette-neutral-containedDisabledBg)',
              },
            },
          },
          containedContext: {
            brand: {
              '[data-mui-color-scheme="light"] &': {
                '--joy-pattern-textColor': 'var(--joy-palette-brand-100)',
                '--joy-pattern-textBg': 'transparent',
                '--joy-pattern-textHoverBg': 'var(--joy-palette-brand-500)',
                '--joy-pattern-textActiveBg': 'var(--joy-palette-brand-700)',
                '--joy-pattern-outlinedColor': '#fff',
                '--joy-pattern-outlinedBorder': 'var(--joy-palette-brand-400)',
                '--joy-pattern-outlinedHoverBorder': 'var(--joy-palette-brand-400)',
                '--joy-pattern-outlinedBg': 'transparent',
                '--joy-pattern-outlinedHoverBg': 'rgba(255, 255, 255, 0.12)',
                '--joy-pattern-outlinedActiveBg': 'var(--joy-palette-brand-700)',
                '--joy-pattern-filledColor': '#fff',
                '--joy-pattern-filledBg': 'rgba(255, 255, 255, 0.2)',
                '--joy-pattern-filledHoverBg': 'var(--joy-palette-brand-400)',
                '--joy-pattern-filledActiveBg': 'var(--joy-palette-brand-400)',
              },
              '[data-mui-color-scheme="dark"] &': {
                '--joy-pattern-textColor': '#fff',
                '--joy-pattern-textBg': 'transparent',
                '--joy-pattern-textHoverBg': 'var(--joy-palette-brand-400)',
                '--joy-pattern-textActiveBg': 'var(--joy-palette-brand-500)',
                '--joy-pattern-outlinedColor': '#fff',
                '--joy-pattern-outlinedBorder': 'var(--joy-palette-brand-400)',
                '--joy-pattern-outlinedHoverBorder': 'var(--joy-palette-brand-400)',
                '--joy-pattern-outlinedBg': 'transparent',
                '--joy-pattern-outlinedHoverBg': 'rgba(255, 255, 255, 0.12)',
                '--joy-pattern-outlinedActiveBg': 'var(--joy-palette-brand-700)',
                '--joy-pattern-filledColor': '#fff',
                '--joy-pattern-filledBg': 'rgba(255, 255, 255, 0.2)',
                '--joy-pattern-filledHoverBg': 'var(--joy-palette-brand-400)',
                '--joy-pattern-filledActiveBg': 'var(--joy-palette-brand-400)',
              },
            },
            neutral: {
              '--joy-pattern-textColor': 'var(--joy-palette-neutral-100)',
              '--joy-pattern-textBg': 'transparent',
              '--joy-pattern-textHoverBg': 'var(--joy-palette-neutral-500)',
              '--joy-pattern-textActiveBg': 'var(--joy-palette-neutral-700)',
              '--joy-pattern-outlinedColor': '#fff',
              '--joy-pattern-outlinedBorder': 'var(--joy-palette-neutral-400)',
              '--joy-pattern-outlinedHoverBorder': 'var(--joy-palette-neutral-400)',
              '--joy-pattern-outlinedBg': 'transparent',
              '--joy-pattern-outlinedHoverBg': 'rgba(255, 255, 255, 0.12)',
              '--joy-pattern-outlinedActiveBg': 'var(--joy-palette-neutral-700)',
              '--joy-pattern-filledColor': '#fff',
              '--joy-pattern-filledBg': 'rgba(255, 255, 255, 0.2)',
              '--joy-pattern-filledHoverBg': 'var(--joy-palette-neutral-400)',
              '--joy-pattern-filledActiveBg': 'var(--joy-palette-neutral-400)',
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
      <Box
        component="header"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          minHeight: 64,
        }}
      >
        <ColorSchemePicker />
      </Box>
      <Container>
        <h2>Patterns (`brand` as default)</h2>
        <Box
          sx={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          <Button pattern="text">Text</Button>
          <Button pattern="outlined">Outlined</Button>
          <Button pattern="filled">Filled</Button>
          <Button pattern="contained">Contained</Button>
          <Box>
            <Badge pattern="outlined">1</Badge>
          </Box>
          <box>
            <Badge pattern="filled">2</Badge>
          </box>
          <Box>
            <Badge pattern="contained">30</Badge>
          </Box>
          <Avatar pattern="outlined">A</Avatar>
          <Avatar pattern="filled">B</Avatar>
          <Avatar pattern="contained">C</Avatar>
          <Paper pattern="text">Text Paper</Paper>
          <Paper pattern="outlined">Outlined Paper</Paper>
          <Paper pattern="filled">Filled Paper</Paper>
          <Paper pattern="contained">Contained Paper</Paper>
          <List>
            <ListItem pattern="outlined">
              ReactJS{' '}
              <Badge pattern="filled" sx={{ minHeight: 'auto' }}>
                New
              </Badge>
            </ListItem>
            <ListItem>Angular</ListItem>
            <ListItem>Vue</ListItem>
          </List>
          <List pattern="outlined">
            <ListItem>ReactJS</ListItem>
            <ListItem pattern="filled">
              Angular{' '}
              <Badge pattern="contained" color="neutral" sx={{ minHeight: 'auto' }}>
                OLD
              </Badge>
            </ListItem>
            <ListItem>Vue</ListItem>
          </List>
          <List pattern="filled">
            <ListItem>
              ReactJS{' '}
              <Badge pattern="filled" color="neutral" sx={{ minHeight: 'auto' }}>
                12
              </Badge>
            </ListItem>
            <ListItem>
              Angular{' '}
              <Badge pattern="filled" color="neutral" sx={{ minHeight: 'auto' }}>
                3
              </Badge>
            </ListItem>
            <ListItem pattern="contained">
              Vue{' '}
              <Badge pattern="filled" color="neutral" sx={{ minHeight: 'auto' }}>
                Latest
              </Badge>
            </ListItem>
          </List>
          <IconButton pattern="text">
            <Close />
          </IconButton>
          <IconButton pattern="outlined">
            <Moon />
          </IconButton>
          <IconButton pattern="filled">
            <Sun />
          </IconButton>
          <IconButton pattern="contained">
            <System />
          </IconButton>
          <Chip>
            <IconButton sx={{ mr: '6px', ml: '-6px' }}>
              <Close width="20" height="20" />
            </IconButton>
            Design
          </Chip>
          <Chip>
            <IconButton pattern="contained" sx={{ mr: '6px', ml: '-6px' }}>
              <Close width="20" height="20" />
            </IconButton>
            Regular
          </Chip>
          <Chip pattern="filled" color="brand">
            <IconButton pattern="contained" sx={{ mr: '6px', ml: '-6px' }}>
              <Close width="20" height="20" />
            </IconButton>
            Full time
          </Chip>
          <Chip pattern="contained">
            <IconButton pattern="filled" color="neutral" sx={{ mr: '6px', ml: '-6px' }}>
              <Close width="20" height="20" />
            </IconButton>
            B2B
          </Chip>
          <Input placeholder="Text" pattern="text" />
          <Input placeholder="Outlined" pattern="outlined" />
          <Input placeholder="Filled" pattern="filled" />
          <Tabs sx={{ gridColumn: 'span 2' }}>
            <Button pattern="text">Tab 1</Button>
            <Button pattern="text">Tab 2</Button>
            <Button>Tab 3</Button>
          </Tabs>
          <Tabs pattern="filled" sx={{ gridColumn: 'span 2' }}>
            <Button pattern="text">Tab 1</Button>
            <Button pattern="text">Tab 2</Button>
            <Button>Tab 3</Button>
          </Tabs>
        </Box>
        <br />
        <br />
        <h2>Pattern context (`contained` is a parent)</h2>
        <Box
          sx={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          <Tabs pattern="contained" color="brand" sx={{ gridColumn: 'span 2' }}>
            <Button pattern="text">Tab 1</Button>
            <Button pattern="text">Tab 2</Button>
            <Button pattern="filled">Tab 3</Button>
          </Tabs>
          <Paper
            enableContext
            pattern="contained"
            color="brand"
            sx={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              gridColumn: 'span 3',
              width: '100%',
              minHeight: '64px',
            }}
          >
            <IconButton pattern="text">
              <Close />
            </IconButton>
            <Chip color="brand" sx={{ ml: 'auto' }}>
              <IconButton sx={{ mr: '6px', ml: '-6px' }}>
                <Close width="20" height="20" />
              </IconButton>
              Design
            </Chip>
            <Input pattern="filled" color="brand" placeholder="Search" />
          </Paper>
          <Paper
            enableContext
            pattern="contained"
            color="brand"
            sx={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              gridColumn: 'span 3',
              width: '100%',
              minHeight: '64px',
            }}
          >
            <IconButton pattern="text">
              <Close />
            </IconButton>
            <Input pattern="outlined" color="brand" placeholder="Search" sx={{ ml: 'auto' }} />
            <Avatar pattern="filled" sx={{ width: 48, height: 48 }} />
          </Paper>
          <Paper
            enableContext
            pattern="contained"
            color="neutral"
            sx={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'space-between',
              alignItems: 'center',
              gridColumn: 'span 2',
              width: '100%',
              minHeight: '64px',
            }}
          >
            Hello World
            <Button pattern="outlined" color="brand">
              Notify
            </Button>
          </Paper>
          <Paper
            enableContext
            pattern="contained"
            color="neutral"
            sx={{
              minWidth: '256px',
              gridColumn: 'span 2',
            }}
          >
            <Input placeholder="Search..." sx={{ width: '100%' }} />
            <br />
            <br />
            <List sx={{ '& > li': { justifyContent: 'flex-start', '& > svg': { mr: '0.5rem' } } }}>
              <ListItem>
                <Sun />
                Getting Started
              </ListItem>
              <ListItem pattern="outlined">
                <Sun />
                Components
              </ListItem>
              <ListItem>
                <Sun />
                Components
              </ListItem>
              <ListItem>
                <Sun />
                System
              </ListItem>
            </List>
            <br />
            <Button pattern="filled" sx={{ width: '100%', mb: '8px' }}>
              Log out
            </Button>
            <Button pattern="outlined" sx={{ width: '100%' }}>
              What&apos;s new?
            </Button>
          </Paper>
          <Paper
            enableContext
            pattern="contained"
            color="brand"
            sx={{
              minWidth: '256px',
              gridColumn: 'span 2',
            }}
          >
            <Input placeholder="Search..." sx={{ width: '100%' }} />
            <br />
            <br />
            <List sx={{ '& > li': { justifyContent: 'flex-start', '& > svg': { mr: '0.5rem' } } }}>
              <ListItem>
                <Sun />
                Getting Started
              </ListItem>
              <ListItem pattern="filled">
                <Sun />
                Components
              </ListItem>
              <ListItem>
                <Sun />
                Components
              </ListItem>
              <ListItem>
                <Sun />
                System
              </ListItem>
            </List>
            <br />
            <Button pattern="filled" sx={{ width: '100%', mb: '8px' }}>
              Log out
            </Button>
            <Button pattern="outlined" sx={{ width: '100%' }}>
              What&apos;s new?
            </Button>
          </Paper>
        </Box>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    </CssVarsProvider>
  );
}

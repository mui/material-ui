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
    borderRadius: '8px',
    cursor: 'pointer',
    background: 'transparent',
  },
  theme.typography.button,
  theme.pattern[pattern]?.[color],
  theme.pattern[`${pattern}Hover`]?.[color],
  theme.pattern[`${pattern}Disabled`]?.[color],
]);

const Divider = styled('hr')(({ theme, color = 'neutral', direction = 'horizontal' }) => [
  {
    display: 'block',
    alignSelf: 'stretch',
    margin: 0,
    border: 0,
    backgroundColor: `var(--joy-pattern-outlinedBorder, ${theme.vars.palette[color].outlinedBorder})`,
  },
  direction === 'horizontal' && {
    height: 1,
    margin: '1rem 0',
  },
  direction === 'vertical' && {
    width: 1,
    margin: '0 1rem',
  },
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

const Typography = styled('p', {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'as',
})(({ theme, variant = 'body' }) => ({
  margin: 0,
  ...theme.typography[variant],
}));

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

                outlinedColor: 'var(--joy-palette-brand-600)',
                outlinedBorder: 'var(--joy-palette-neutral-300)',
                outlinedHoverBg: 'var(--joy-palette-neutral-100)',
                outlinedHoverBorder: 'var(--joy-palette-neutral-400)',
                outlinedActiveBg: 'var(--joy-palette-neutral-200)',
                outlinedDisabledColor: 'var(--joy-palette-neutral-300)',
                outlinedDisabledBorder: 'var(--joy-palette-neutral-200)',

                filledColor: 'var(--joy-palette-brand-700)',
                filledBg: 'var(--joy-palette-brand-100)',
                filledHoverBg: 'var(--joy-palette-brand-200)',
                filledActiveBg: 'var(--joy-palette-brand-300)',
                filledDisabledColor: 'var(--joy-palette-brand-400)',
                filledDisableBg: 'var(--joy-palette-brand-50)',

                containedColor: '#fff',
                containedBg: 'var(--joy-palette-brand-500)',
                containedHoverBg: 'var(--joy-palette-brand-600)',
                containedActiveBg: 'var(--joy-palette-brand-400)',
                containedDisabledBg: 'var(--joy-palette-brand-300)',
              },
              neutral: {
                textColor: 'var(--joy-palette-neutral-600)',
                textHoverBg: 'var(--joy-palette-neutral-100)',
                textActiveBg: 'var(--joy-palette-neutral-200)',
                textDisabledColor: 'var(--joy-palette-neutral-300)',

                outlinedColor: 'var(--joy-palette-neutral-600)',
                outlinedBorder: 'var(--joy-palette-neutral-100)',
                outlinedHoverBg: 'var(--joy-palette-neutral-100)',
                outlinedHoverBorder: 'var(--joy-palette-neutral-300)',
                outlinedActiveBg: 'var(--joy-palette-neutral-200)',
                outlinedDisabledColor: 'var(--joy-palette-neutral-300)',
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

                outlinedColor: 'var(--joy-palette-brand-200)',
                outlinedBorder: 'var(--joy-palette-neutral-700)',
                outlinedHoverBg: 'var(--joy-palette-neutral-800)',
                outlinedHoverBorder: 'var(--joy-palette-neutral-600)',
                outlinedActiveBg: 'var(--joy-palette-neutral-700)',
                outlinedDisabledColor: 'var(--joy-palette-neutral-500)',
                outlinedDisabledBorder: 'var(--joy-palette-neutral-800)',

                filledColor: 'var(--joy-palette-brand-300)',
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

                outlinedColor: 'var(--joy-palette-neutral-200)',
                outlinedBorder: 'var(--joy-palette-neutral-800)',
                outlinedHoverBg: 'var(--joy-palette-neutral-800)',
                outlinedHoverBorder: 'var(--joy-palette-neutral-600)',
                outlinedActiveBg: 'var(--joy-palette-neutral-700)',
                outlinedDisabledColor: 'var(--joy-palette-neutral-500)',
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
                transparency: 'var(--joy-palette-neutral-800)',
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
              color: 'var(--joy-pattern-outlinedColor, var(--joy-palette-brand-outlinedColor))',
              border: '1px solid',
              borderColor:
                'var(--joy-pattern-outlinedBorder, var(--joy-palette-brand-outlinedBorder))',
            },
            neutral: {
              color: 'var(--joy-pattern-outlinedColor, var(--joy-palette-neutral-outlinedColor))',
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
                  'var(--joy-pattern-outlinedHoverBg, var(--joy-palette-brand-outlinedHoverBg))',
              },
            },
            neutral: {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor:
                  'var(--joy-pattern-outlinedHoverBg, var(--joy-palette-neutral-outlinedHoverBg))',
              },
            },
          },
          outlinedActive: {
            brand: {
              '&:active': {
                backgroundColor:
                  'var(--joy-pattern-outlinedActiveBg, var(--joy-palette-brand-outlinedActiveBg))',
              },
            },
            neutral: {
              '&:active': {
                backgroundColor:
                  'var(--joy-pattern-outlinedActiveBg, var(--joy-palette-neutral-outlinedActiveBg))',
              },
            },
          },
          outlinedDisabled: {
            brand: {
              '&.Mui-disabled': {
                color:
                  'var(--joy-pattern-outlinedDisabledColor, var(--joy-palette-brand-outlinedDisabledColor))',
                borderColor:
                  'var(--joy-pattern-outlinedDisabledBorder, var(--joy-palette-brand-outlinedDisabledBorder))',
              },
            },
            neutral: {
              '&.Mui-disabled': {
                color:
                  'var(--joy-pattern-outlinedDisabledColor, var(--joy-palette-neutral-outlinedDisabledColor))',
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
      <Paper
        pattern="contained"
        enableContext
        color="brand"
        as="header"
        sx={{
          minHeight: 56,
          borderRadius: 0,
          display: 'flex',
          alignItems: 'center',
          py: 0,
          position: 'sticky',
          top: 0,
        }}
      >
        <IconButton pattern="outlined">
          <Sun />
        </IconButton>
        <Divider direction="vertical" />
        <Typography sx={{ color: 'inherit' }}>Email</Typography>
        <Divider direction="vertical" />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Sun />
          <Input pattern="text" placeholder="Search..." />
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <ColorSchemePicker />
        </Box>
      </Paper>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: 66, flexShrink: 0 }}>
          <Box
            sx={{
              position: 'sticky',
              width: '100%',
              height: 'calc(100vh - 56px)',
              top: '56px',
              bgcolor: 'var(--joy-palette-brand-900)',
              py: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              '--joy-pattern-outlinedColor': 'var(--joy-palette-brand-200)',
              '--joy-pattern-outlinedBorder': 'var(--joy-palette-brand-700)',
              '--joy-pattern-outlinedHoverBg': 'var(--joy-palette-brand-700)',
            }}
          >
            <IconButton pattern="outlined">
              <Sun />
            </IconButton>
            <IconButton pattern="outlined">
              <Sun />
            </IconButton>
            <IconButton pattern="outlined">
              <Sun />
            </IconButton>
          </Box>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, display: 'flex', '& > *:not(:last-child)': { flexShrink: 0 } }}
        >
          <Paper sx={{ width: 200, p: '0px' }}>
            <Box sx={{ p: '1rem' }}>
              <Typography variant="overline">Browse</Typography>
            </Box>
            <List sx={{ px: '0.5rem' }}>
              <ListItem pattern="filled" color="brand">
                Inbox
              </ListItem>
              <ListItem>Sent</ListItem>
              <ListItem>Draft</ListItem>
              <ListItem>Flagged</ListItem>
              <ListItem>Trash</ListItem>
            </List>
          </Paper>
          <Divider color="neutral" direction="vertical" sx={{ m: '0px' }} />
          <Paper sx={{ width: 320, p: '0px' }}>
            <Box sx={{ p: '1rem' }}>
              <Typography variant="overline">Inbox</Typography>
            </Box>
            {[...Array(5)].map((_, index) => (
              <React.Fragment key={index}>
                <Box sx={{ p: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Paper pattern="filled" sx={{ minWidth: 32, minHeight: 32 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: '0.25rem',
                      }}
                    >
                      <Typography variant="detail">Janet Ericson</Typography>
                      <Typography variant="detail">14 Oct 2016</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ mb: '0.25rem' }}>
                      Blank slates for new website
                    </Typography>
                    <Typography variant="detail">Hi, Thomas, You don&apos;t have...</Typography>
                  </Box>
                </Box>
                <Divider color="neutral" sx={{ m: 0 }} />
              </React.Fragment>
            ))}
          </Paper>
          <Divider color="neutral" direction="vertical" sx={{ m: '0px' }} />
          <Box sx={{ flexGrow: 1, p: '1rem' }}>
            <Paper sx={{ p: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', p: '1rem' }}>
                <Paper pattern="filled" sx={{ minWidth: 32, minHeight: 32 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="caption" sx={{ mb: '0.25rem' }}>
                    Janet Erickson
                  </Typography>
                  <Typography variant="detail">Today at 15:45</Typography>
                </Box>
                <Button pattern="outlined" color="brand" sx={{ minHeight: 34, p: '0.25rem 1rem' }}>
                  Reply
                </Button>
                <IconButton pattern="outlined" color="brand">
                  <Sun />
                </IconButton>
                <IconButton pattern="outlined" color="brand">
                  <Sun />
                </IconButton>
              </Box>
              <Divider sx={{ m: 0 }} />
              <Box sx={{ p: '1rem' }}>
                <Typography variant="h5" sx={{ mb: '1rem' }}>
                  Blank slates for new website
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem', mb: '1rem' }}>
                  <Typography variant="detail">From</Typography>
                  <Button
                    pattern="filled"
                    sx={{
                      minHeight: '22px',
                      py: 0,
                      px: '0.5rem',
                      fontWeight: 400,
                      fontSize: '12px',
                    }}
                  >
                    janet@mail.com
                  </Button>
                  <Typography variant="detail">To</Typography>
                  <Button
                    pattern="filled"
                    sx={{
                      minHeight: '22px',
                      py: 0,
                      px: '0.5rem',
                      fontWeight: 400,
                      fontSize: '12px',
                    }}
                  >
                    janet@mail.com
                  </Button>
                </Box>
                <Divider />
                <Typography>
                  Hi, Thomas,
                  <br />
                  <br />
                  You don’t have to be a designer to appreciate good typography – just check out
                  this student-made device that can detect and name fonts just by looking at it.
                  While the pop culture world obsesses over the latest Snapchat filter fads and
                  Instagram friending, skilled photographers are taking the shots that transcend
                  social media Share Quote. Take advantage of an incredible offer to become a
                  skilled and certified photographer, taking frame-worthy shots every time with The
                  Hollywood Art Institute Photography Course and Certification. <br />
                  <br />
                  Regards, Janet Erickson
                </Typography>
                <Divider />
                <Typography variant="caption" sx={{ mb: '1rem' }}>
                  Attachments
                </Typography>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <Paper pattern="filled" sx={{ minWidth: '64px', minHeight: '64px' }} />
                  <Paper pattern="filled" sx={{ minWidth: '64px', minHeight: '64px' }} />
                  <Paper pattern="outlined" sx={{ display: 'flex', p: 0, minHeight: 0 }}>
                    <Paper
                      pattern="filled"
                      sx={{ minWidth: '64px', minHeight: '64px', borderRadius: 0 }}
                    />
                    <Box sx={{ p: '0.75rem' }}>
                      <Typography variant="caption" sx={{ color: 'var(--joy-palette-brand-500)' }}>
                        blank_slates.doc
                      </Typography>
                      <Typography variant="detail">blank_slates.doc</Typography>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

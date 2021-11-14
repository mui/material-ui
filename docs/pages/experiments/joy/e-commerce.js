import * as React from 'react';
import Head from 'next/head';
import { GlobalStyles } from '@mui/styled-engine';
import Box from '@mui/material/Box';
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

const Bag = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" {...props}>
    <title>Bag Handle</title>
    <path
      d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zM160 176v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <path
      d="M160 224v16a96 96 0 0096 96h0a96 96 0 0096-96v-16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
  </svg>
);

const Search = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width="24"
    height="24"
    {...props}
  >
    <title>Search</title>
    <path
      d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="32"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="32"
      d="M338.29 338.29L448 448"
    />
  </svg>
);

const Options = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width="24"
    height="24"
    {...props}
  >
    <title>Options</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      d="M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80"
    />
    <circle
      cx="336"
      cy="128"
      r="32"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <circle
      cx="176"
      cy="256"
      r="32"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <circle
      cx="336"
      cy="384"
      r="32"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
  </svg>
);

const Heart = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width="24"
    height="24"
    {...props}
  >
    <title>Heart</title>
    <path
      d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
  </svg>
);

const Check = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width="24"
    height="24"
    {...props}
  >
    <title>Checkmark</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      d="M416 128L192 384l-96-96"
    />
  </svg>
);

const Remove = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width="24"
    height="24"
    {...props}
  >
    <title>Remove</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      d="M400 256H112"
    />
  </svg>
);

const Add = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width="24"
    height="24"
    {...props}
  >
    <title>Add</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      d="M256 112v288M400 256H112"
    />
  </svg>
);

const Trash = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width="24"
    height="24"
    {...props}
  >
    <title>Trash</title>
    <path
      d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="32"
      d="M80 112h352"
    />
    <path
      d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
  </svg>
);

const ArrowBack = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width="24"
    height="24"
    {...props}
  >
    <title>Arrow Back</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="48"
      d="M244 400L100 256l144-144M120 256h292"
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

const Paper = styled('div')(({ theme, pattern = 'text', color = 'neutral' }) => [
  {
    minWidth: 100,
    minHeight: 120,
    padding: '1rem',
    borderRadius: 4,
    backgroundColor: `var(--joy-pattern-${pattern}Bg, var(--joy-palette-bgNeutral-plain))`,
  },
  theme.pattern[pattern]?.[color],
  pattern === 'contained' && theme.pattern.containedContext?.[color],
]);

const IconButton = styled('button')(({ theme, pattern = 'filled', color = 'brand' }) => [
  {
    border: 0,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem',
    borderRadius: '24px',
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

const Typography = styled('p')(({ theme, variant = 'body' }) => ({
  margin: 0,
  ...theme.typography[variant],
}));

export default function JoyEcommerce() {
  return (
    <CssVarsProvider
      defaultMode="system"
      theme={{
        fontFamily: {
          sans: 'Catamaran',
        },
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
                outlinedBorder: 'var(--joy-palette-neutral-200)',
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
                outlinedBorder: 'var(--joy-palette-neutral-700)',
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
          href="https://fonts.googleapis.com/css2?family=Catamaran:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        />
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
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
        color="brand"
        as="header"
        sx={{
          minHeight: 56,
          borderRadius: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 0,
        }}
      >
        <ColorSchemePicker />
      </Paper>
      <Box
        sx={{
          mt: '1rem',
          display: 'grid',
          gap: '2rem',
          p: '2rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(375px, 1fr))',
        }}
      >
        <Box
          sx={{
            minHeight: '568px',
            p: '1rem',
            bgcolor: 'var(--joy-palette-bgNeutral-plain)',
            borderRadius: '32px',
          }}
        >
          <Box
            component="header"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              mb: '2rem',
            }}
          >
            <Avatar pattern="filled" color="neutral" sx={{ width: '48px', height: '48px' }} />
            <Typography as="div" variant="h4" sx={{ flexGrow: 1, minWidth: 0 }}>
              Hi, Victoria!
            </Typography>
            <IconButton
              pattern="text"
              color="neutral"
              sx={{
                borderRadius: '20px',
                width: '40px',
                height: '40px',
                position: 'relative',
              }}
            >
              <Badge
                color="neutral"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  transform: 'translate(50%, -50%)',
                  minHeight: '20px',
                  minWidth: '20px',
                  borderRadius: '20px',
                  border: '2px solid var(--joy-palette-bgNeutral-plain)',
                }}
              >
                2
              </Badge>
              <Bag />
            </IconButton>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: '1rem' }}>
            Find the best <br /> clothes for you
          </Typography>
          <Paper
            pattern="filled"
            sx={{
              py: 0,
              borderRadius: '20px',
              minHeight: 'unset',
              display: 'flex',
              alignItems: 'center',
              mb: '1rem',
            }}
          >
            <Search />
            <Input
              pattern="text"
              placeholder="Search"
              sx={{ backgroundColor: 'unset', flexGrow: 1 }}
            />
            <IconButton pattern="filled" color="neutral">
              <Options />
            </IconButton>
          </Paper>

          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              '& > div': {
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              },
            }}
          >
            <Box>
              <Box>
                <Paper
                  pattern="filled"
                  sx={{
                    borderRadius: '20px',
                    minHeight: '240px',
                    mb: '0.5rem',
                    position: 'relative',
                  }}
                >
                  <IconButton
                    pattern="contained"
                    sx={{
                      borderRadius: '20px',
                      padding: '0.5rem',
                      // backgroundColor: 'var(--joy-palette-bgNeutral-plain)',
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                    }}
                  >
                    <Heart />
                  </IconButton>
                </Paper>
                <Typography variant="headingSubtitle">Cotton dress</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  $129.00
                </Typography>
              </Box>
              <Box>
                <Paper
                  pattern="filled"
                  sx={{
                    borderRadius: '20px',
                    minHeight: '160px',
                    mb: '0.5rem',
                  }}
                />
                <Typography variant="headingSubtitle">Cotton dress</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  $129.00
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box>
                <Paper pattern="filled" sx={{ borderRadius: '20px', minHeight: '200px' }} />
                <Typography variant="headingSubtitle">Cotton T-shirt</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  $59.00
                </Typography>
              </Box>
              <Box>
                <Paper pattern="filled" sx={{ borderRadius: '20px', minHeight: '200px' }} />
                <Typography variant="headingSubtitle">Cotton T-shirt</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  $59.00
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            minHeight: '568px',
            bgcolor: 'var(--joy-palette-bgNeutral-plain)',
            borderRadius: '32px',
            p: '0.5rem',
          }}
        >
          <Paper
            pattern="filled"
            sx={{ borderRadius: '28px', position: 'relative', minHeight: 400 }}
          >
            <IconButton
              color="neutral"
              pattern="text"
              sx={{ position: 'absolute', top: '1rem', left: '1rem' }}
            >
              <ArrowBack width="32" height="32" />
            </IconButton>
            <IconButton
              color="neutral"
              pattern="text"
              sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
            >
              <Heart width="32" height="32" />
            </IconButton>
            <Paper
              sx={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.12)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                p: '0.5rem',
                borderRadius: '20px',
                minWidth: 'unset',
              }}
            >
              <Paper pattern="filled" sx={{ minWidth: 56, minHeight: 56, borderRadius: '16px' }} />
              <Paper pattern="filled" sx={{ minWidth: 56, minHeight: 56, borderRadius: '16px' }} />
              <Paper pattern="filled" sx={{ minWidth: 56, minHeight: 56, borderRadius: '16px' }} />
              <Paper pattern="filled" sx={{ minWidth: 56, minHeight: 56, borderRadius: '16px' }} />
            </Paper>
          </Paper>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              my: '1rem',
              px: '1rem',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Jean jacket
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              $109.00
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              my: '2rem',
              px: '1rem',
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 600, mb: '0.5rem' }}>Color</Typography>
              <Box sx={{ display: 'flex', gap: '0.75rem' }}>
                <Avatar
                  pattern="filled"
                  sx={{
                    width: '48px',
                    height: '48px',
                    position: 'relative',
                    bgcolor: 'tan',
                  }}
                >
                  <Badge
                    color="neutral"
                    sx={{
                      lineHeight: 0,
                      position: 'absolute',
                      p: '0.25rem',
                      top: 8,
                      right: 8,
                      transform: 'translate(50%, -50%)',
                      minHeight: '20px',
                      minWidth: '20px',
                      borderRadius: '20px',
                      border: '2px solid var(--joy-palette-bgNeutral-plain)',
                    }}
                  >
                    <Check width="16" height="16" />
                  </Badge>
                </Avatar>
                <Avatar
                  pattern="filled"
                  sx={{
                    width: '48px',
                    height: '48px',
                    bgcolor: 'darkseagreen',
                  }}
                />
                <Avatar
                  pattern="filled"
                  sx={{
                    width: '48px',
                    height: '48px',
                    bgcolor: '#a2ccd2',
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600, mb: '0.5rem' }}>Size</Typography>
              <Box sx={{ display: 'flex', gap: '0.75rem' }}>
                <Button color="neutral" sx={{ minWidth: '48px', p: 0 }}>
                  S
                </Button>
                <Button color="neutral" pattern="filled" sx={{ minWidth: '48px', p: 0 }}>
                  M
                </Button>
                <Button color="neutral" pattern="filled" sx={{ minWidth: '48px', p: 0 }}>
                  L
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              px: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <IconButton color="neutral" sx={{ borderRadius: '20px' }}>
                <Remove />
              </IconButton>
              <Typography variant="h5">1</Typography>
              <IconButton color="neutral" sx={{ borderRadius: '20px' }}>
                <Add />
              </IconButton>
            </Box>
            <Button>Add to cart</Button>
          </Box>
        </Box>

        <Box
          sx={{
            minHeight: '568px',
            bgcolor: 'var(--joy-palette-bgNeutral-plain)',
            borderRadius: '32px',
            p: '1rem',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <IconButton color="neutral" pattern="text">
              <ArrowBack width="32" height="32" />
            </IconButton>
            <Typography variant="h5" sx={{ textAlign: 'center', flexGrow: 1 }}>
              Shopping Bag
            </Typography>
            <IconButton
              color="neutral"
              pattern="text"
              sx={{
                position: 'relative',
              }}
            >
              <Bag width="32" height="32" />
              <Badge
                color="neutral"
                sx={{
                  lineHeight: 1,
                  position: 'absolute',
                  p: '0.25rem',
                  top: 8,
                  right: 8,
                  transform: 'translate(50%, -50%)',
                  minHeight: '26px',
                  minWidth: '26px',
                  borderRadius: '20px',
                  border: '2px solid var(--joy-palette-bgNeutral-plain)',
                }}
              >
                3
              </Badge>
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', gap: '1.5rem', flexDirection: 'column', my: '1.5rem' }}>
            {[...Array(3)].map((_, index) => (
              <Box key={index} sx={{ display: 'flex', gap: '1rem' }}>
                <Avatar
                  color="neutral"
                  sx={{ borderRadius: '16px', height: '72px', width: '72px' }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    Fitting dress
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>$199.00</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <IconButton
                      pattern="outlined"
                      color="neutral"
                      sx={{ borderRadius: '20px', padding: '0.25rem' }}
                    >
                      <Remove width="20" height="20" />
                    </IconButton>
                    <Typography variant="h5">1</Typography>
                    <IconButton
                      pattern="outlined"
                      color="neutral"
                      sx={{ borderRadius: '20px', padding: '0.25rem' }}
                    >
                      <Add width="20" height="20" />
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="headingIntro" sx={{ textAlign: 'center' }}>
                    L
                  </Typography>
                  <IconButton pattern="text">
                    <Trash />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>

          <Paper
            pattern="filled"
            sx={{
              p: '0.25rem',
              minHeight: 'unset',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '24px',
              gap: '1rem',
            }}
          >
            <Input
              pattern="text"
              placeholder="Promo code"
              sx={{ flexGrow: 1, bgcolor: 'unset', borderRadius: '20px' }}
            />
            <Button>Apply</Button>
          </Paper>

          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', p: '0.5rem', my: '2rem' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Typography variant="headingIntro">Sub Total</Typography>
              <Divider sx={{ height: 2, flexGrow: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                $367.00
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Typography variant="headingIntro">Shipping</Typography>
              <Divider sx={{ height: 2, flexGrow: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                $4.00
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Typography variant="headingIntro">Bag Total</Typography>
              <Divider sx={{ height: 2, flexGrow: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                $371.00
              </Typography>
            </Box>
          </Box>
          <Button sx={{ width: '100%', py: '1rem' }}>Proceed to Checkout</Button>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

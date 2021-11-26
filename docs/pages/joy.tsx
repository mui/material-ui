import * as React from 'react';
import Container from '@mui/material/Container';
// @ts-ignore
import { jsx as _jsx } from 'react/jsx-runtime';
import { Box } from '@mui/system';
import {
  CssVarsProvider,
  useColorScheme,
  styled,
  JoyTheme,
  VariantProp,
  FontSize,
  ColorPaletteProp,
} from '@mui/joy/styles';
import { GlobalStyles } from '@mui/styled-engine';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';

const Button = styled('button')<{
  variant?: VariantProp;
  color?: ColorPaletteProp;
  square?: boolean;
  size?: 'small';
}>(({ theme, variant = 'contained', color = 'primary', square, size }) => [
  {
    ...(size === 'small' && {
      '--Button-minHeight': '2rem',
    }),
    padding: '0.25rem 2rem',
    minHeight: 'var(--Button-minHeight, 2.5rem)',
    ...(square && {
      minWidth: 'var(--Button-minHeight, 2.5rem)',
      padding: '0.25rem',
    }),
    borderRadius: '28px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '&:focus-visible': theme.focus.default,
  },
  theme.typography.body1,
  theme.variants[variant]?.[color],
  theme.variants[`${variant}Hover`]?.[color],
]);

const SvgIcon = styled('svg', { shouldForwardProp: (prop) => prop !== 'fontSize' })<{
  fontSize: keyof FontSize | 'inherit';
}>(({ theme, fontSize }) => ({
  userSelect: 'none',
  width: '1em',
  height: '1em',
  display: 'inline-block',
  fill: 'currentColor',
  flexShrink: 0,
  ...(fontSize && {
    fontSize: fontSize === 'inherit' ? 'inherit' : theme.vars.fontSize[fontSize],
  }),
}));

// ICONS

function createSvgIcon(path: any, displayName: any) {
  const Component = (props: any, ref: any) =>
    (
      <SvgIcon
        data-testid={`${displayName}Icon`}
        ref={ref}
        viewBox="0 0 24 24"
        fontSize="xl"
        {...props}
      >
        {path}
      </SvgIcon>
    ) as unknown as typeof SvgIcon;

  // @ts-ignore
  return React.memo(React.forwardRef(Component));
}

const Github = createSvgIcon(
  _jsx('path', {
    d: 'M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27',
  }),
  'GitHub',
);

export const Moon = createSvgIcon(
  _jsx('path', {
    d: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z',
  }),
  'DarkMode',
);

export const Sun = createSvgIcon(
  _jsx('path', {
    d: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z',
  }),
  'LightMode',
);

export const System = createSvgIcon(
  _jsx('path', {
    d: 'M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm1-17.93c3.94.49 7 3.85 7 7.93s-3.05 7.44-7 7.93V4.07z',
  }),
  'Contrast',
);

// ===========================================

const Header = styled('header')(() => ({
  minHeight: 112,
  position: 'sticky',
  top: 0,
  display: 'flex',
  alignItems: 'center',
}));

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
      // @ts-expect-error
      sx={(theme: JoyTheme) => {
        return {
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: '24px',
          ...theme.variants.outlined.neutral,
        };
      }}
    >
      <Box sx={{ display: 'flex', gap: '8px', p: 0.5 }}>
        {(['system', 'light', 'dark'] as const).map((modeId) => {
          const icons = {
            system: System,
            light: Sun,
            dark: Moon,
          };
          const Icon = icons[modeId];
          return (
            <Button
              key={modeId}
              square
              color={mode === modeId ? 'primary' : 'neutral'}
              variant={mode === modeId ? 'light' : 'text'}
              size="small"
              onClick={() => {
                setMode(modeId);
              }}
            >
              <Icon fontSize="lg" />
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

const blue = {
  50: '#F7F9FF',
  100: '#E8EEFE',
  200: '#CAD6FC',
  300: '#A5BAFB',
  400: '#6085F7',
  500: '#3D62D5',
  600: '#2B4697',
  700: '#23397C',
  800: '#121D40',
  900: '#0B1228',
};

export default function Joy() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              primary: blue,
            },
          },
          dark: {
            palette: {
              primary: blue,
            },
          },
        },
      }}
    >
      <GlobalStyles
        // @ts-ignore
        styles={(theme: JoyTheme) => ({
          html: {
            WebkitFontSmoothing: 'antialiased', // Antialiasing.
            MozOsxFontSmoothing: 'grayscale', // Antialiasing.
            // Change from `box-sizing: content-box` so that `width`
            // is not affected by `padding` or `border`.
            boxSizing: 'border-box',
            // Fix font resize problem in iOS
            WebkitTextSizeAdjust: '100%',
            backgroundColor: theme.vars.palette.background.default,
          },
          '*, *::before, *::after': {
            boxSizing: 'inherit',
          },
          body: {
            margin: 0, // Remove the margin in all browsers.
            ...theme.typography.body1,
            // Add support for document.body.requestFullScreen().
            // Other elements, if background transparent, are not supported.
            '&::backdrop': {
              backgroundColor: theme.vars.palette.background.default,
            },
          },
        })}
      />
      <Header>
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <SvgMuiLogo />
          <Button square variant="outlined" sx={{ ml: 'auto', mr: 1 }}>
            <Github />
          </Button>
          <ColorSchemePicker />
        </Container>
      </Header>
      <Container sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}></Box>
      </Container>
    </CssVarsProvider>
  );
}

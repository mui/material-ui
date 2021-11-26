import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import useScrollTrigger from '@mui/material/useScrollTrigger';
// @ts-ignore
import { jsx as _jsx } from 'react/jsx-runtime';
import { Box, CSSObject } from '@mui/system';
import {
  CssVarsProvider,
  useColorScheme,
  styled,
  JoyTheme,
  VariantProp,
  FontSize,
  ColorPaletteProp,
  TypographySystem,
} from '@mui/joy/styles';
import { GlobalStyles } from '@mui/styled-engine';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import SvgStackOverflow from 'docs/src/icons/SvgStackOverflow';

declare module '@mui/joy/styles' {
  interface TypographySystem {
    overline: CSSObject;
  }

  interface Palette {
    gradient: {
      text: string;
      bg: string;
    };
    shadow: string;
  }

  interface PaletteBackground {
    translucent1: string;
  }
}

const Button = styled('button')<{
  variant?: VariantProp;
  color?: ColorPaletteProp;
  square?: boolean;
  size?: 'small' | 'large';
}>(({ theme, variant = 'contained', color = 'primary', square, size }) => [
  {
    ...(size === 'small' && {
      '--Button-minHeight': '2rem',
    }),
    ...(size === 'large' && {
      '--Button-minHeight': '3rem',
    }),
    borderRadius: theme.vars.borderRadius.default,
    padding: '0.25rem 2rem',
    minHeight: 'var(--Button-minHeight, 2.5rem)',
    ...(square && {
      minWidth: 'var(--Button-minHeight, 2.5rem)',
      padding: '0.25rem',
    }),
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
  {
    fontWeight: 'bold',
  },
  theme.variants[variant]?.[color],
  theme.variants[`${variant}Hover`]?.[color],
]);

const Typography = styled('p')<{ level?: keyof TypographySystem }>(({ theme, level = 'body1' }) => [
  { margin: 0 },
  theme.typography[level],
]);

const Input = styled('input')(({ theme }) => [
  theme.variants.outlined.neutral,
  theme.typography.body1,
  {
    borderRadius: theme.vars.borderRadius.default,
    padding: '0.75rem 1rem',
    '&:focus-visible': theme.focus.default,
    '&::placeholder': {
      color: theme.vars.palette.text.tertiary,
    },
    backgroundColor: `var(--joy-variant-outlinedBg, ${theme.vars.palette.background.level1})`,
  },
]);

const GradientText = styled('span')(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.vars.palette.gradient.text})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const SvgIcon = styled('svg', {
  shouldForwardProp: (prop) => prop !== 'fontSize' && prop !== 'sx',
})<{
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

function createSvgIcon(path: any, displayName: any, initialProps?: any) {
  const Component = (props: any, ref: any) =>
    (
      <SvgIcon
        data-testid={`${displayName}Icon`}
        ref={ref}
        viewBox="0 0 24 24"
        fontSize="xl"
        {...initialProps}
        {...props}
        sx={{ ...initialProps?.sx, ...props.sx }}
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

const Moon = createSvgIcon(
  _jsx('path', {
    d: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z',
  }),
  'DarkMode',
);

const Sun = createSvgIcon(
  _jsx('path', {
    d: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z',
  }),
  'LightMode',
);

const System = createSvgIcon(
  _jsx('path', {
    d: 'M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm1-17.93c3.94.49 7 3.85 7 7.93s-3.05 7.44-7 7.93V4.07z',
  }),
  'Contrast',
);

const Twitter = createSvgIcon(
  _jsx('path', {
    d: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z',
  }),
  'Twitter',
);

const LinkedIn = createSvgIcon(
  _jsx('path', {
    d: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
  }),
  'LinkedIn',
);

const Flask = createSvgIcon(
  _jsx('path', {
    d: 'M8.25001 2.25H15.75M5.53126 14.25H18.4688M9.75001 2.25V6.63188C9.74994 7.19894 9.58938 7.75441 9.28689 8.23406L3.43173 17.5073C2.26876 19.3491 3.59204 21.75 5.76939 21.75H18.2306C20.408 21.75 21.7313 19.3491 20.5683 17.5073L14.7127 8.23406C14.4103 7.75436 14.2499 7.1989 14.25 6.63188V2.25',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }),
  'Flask',
  { sx: { fill: 'none' } },
);

const Sparkles = createSvgIcon(
  _jsx('path', {
    d: 'M12.1836 12.3238L10.1436 7.02038C10.113 6.94079 10.059 6.87235 9.98871 6.82408C9.91842 6.7758 9.83515 6.74996 9.74988 6.74996C9.66461 6.74996 9.58134 6.7758 9.51105 6.82408C9.44075 6.87235 9.38674 6.94079 9.35613 7.02038L7.31613 12.3238C7.29494 12.3789 7.26242 12.429 7.22067 12.4707C7.17893 12.5125 7.12889 12.545 7.07378 12.5662L1.77035 14.6062C1.69076 14.6368 1.62232 14.6908 1.57404 14.7611C1.52577 14.8314 1.49993 14.9146 1.49993 14.9999C1.49993 15.0852 1.52577 15.1685 1.57404 15.2387C1.62232 15.309 1.69076 15.363 1.77035 15.3937L7.07378 17.4337C7.12889 17.4549 7.17893 17.4874 7.22067 17.5291C7.26242 17.5709 7.29494 17.6209 7.31613 17.676L9.35613 22.9794C9.38674 23.059 9.44075 23.1275 9.51105 23.1757C9.58134 23.224 9.66461 23.2499 9.74988 23.2499C9.83515 23.2499 9.91842 23.224 9.98871 23.1757C10.059 23.1275 10.113 23.059 10.1436 22.9794L12.1836 17.676C12.2048 17.6209 12.2373 17.5709 12.2791 17.5291C12.3208 17.4874 12.3709 17.4549 12.426 17.4337L17.7294 15.3937C17.809 15.363 17.8774 15.309 17.9257 15.2387C17.974 15.1685 17.9998 15.0852 17.9998 14.9999C17.9998 14.9146 17.974 14.8314 17.9257 14.7611C17.8774 14.6908 17.809 14.6368 17.7294 14.6062L12.426 12.5662C12.3709 12.545 12.3208 12.5125 12.2791 12.4707C12.2373 12.429 12.2048 12.3789 12.1836 12.3238ZM5.06238 3.18741L4.12488 0.749908L3.18738 3.18741L0.749878 4.12491L3.18738 5.06241L4.12488 7.49991L5.06238 5.06241L7.49988 4.12491L5.06238 3.18741ZM20 5.49975L18.7499 2.24991L17.4997 5.49975L14.2499 6.74991L17.4997 8.00007L18.7499 11.2499L20 8.00007L23.2499 6.74991L20 5.49975Z',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }),
  'Flask',
  { sx: { fill: 'none' } },
);

const Hammer = createSvgIcon(
  _jsx('path', {
    d: 'M13.004 11.5781C12.9524 11.4841 12.8881 11.3979 12.8127 11.3217L11.9531 10.4737C11.8648 10.3838 11.7605 10.3111 11.6456 10.2595C11.4647 10.1788 11.2637 10.1548 11.0689 10.1905C10.8742 10.2262 10.6948 10.32 10.5543 10.4596C10.2562 10.7531 9.71056 11.2884 8.72619 12.261C6.84369 14.1234 3.34822 17.2448 1.76759 18.576C1.68796 18.6427 1.62302 18.7251 1.57691 18.8182C1.5308 18.9112 1.50451 19.0128 1.4997 19.1165C1.4949 19.2203 1.51169 19.3239 1.54901 19.4208C1.58633 19.5177 1.64336 19.6058 1.7165 19.6795L3.54462 21.5277C3.61824 21.6016 3.70634 21.6594 3.80338 21.6976C3.90042 21.7357 4.00431 21.7534 4.10851 21.7495C4.21271 21.7456 4.31498 21.7202 4.40888 21.6748C4.50278 21.6295 4.58629 21.5652 4.65415 21.486C6.02478 19.8749 9.16822 16.3767 11.0292 14.5377C11.9849 13.5974 12.5207 13.0574 12.824 12.7593C12.9744 12.6064 13.0728 12.4099 13.1051 12.1978C13.1374 11.9857 13.102 11.7689 13.004 11.5781V11.5781ZM22.4263 9.42181L20.8181 7.82806C20.7935 7.80354 20.7642 7.78428 20.732 7.77146C20.6998 7.75865 20.6652 7.75254 20.6306 7.75353C20.5959 7.75295 20.5615 7.75923 20.5293 7.77202C20.4972 7.78482 20.4678 7.80386 20.4431 7.82806C20.3852 7.88624 20.3147 7.93032 20.2371 7.9569C20.1595 7.98348 20.0768 7.99184 19.9954 7.98134C19.7854 7.95837 19.5618 7.89322 19.4174 7.75353C19.0893 7.43197 19.4685 6.79916 19.1798 6.39416C18.85 5.95096 18.4884 5.53235 18.0979 5.14165C17.767 4.81353 16.4662 3.57275 14.2752 2.67931C13.5761 2.39288 12.8277 2.24575 12.0721 2.24619C10.837 2.24619 9.88728 2.79744 9.54087 3.11384C9.26525 3.36322 8.97837 3.75931 8.97837 3.75931C9.14403 3.69892 9.31326 3.64882 9.48509 3.60931C9.84343 3.53252 10.2111 3.50898 10.5763 3.53947C11.3057 3.59994 12.1846 3.94212 12.6562 4.31244C13.416 4.92181 13.7427 5.73697 13.7938 6.78884C13.8313 7.57119 13.0799 8.55884 12.367 9.36415C12.3042 9.43496 12.2712 9.52721 12.2747 9.62174C12.2782 9.71627 12.3179 9.80582 12.3857 9.87181L13.3813 10.867C13.4507 10.9355 13.544 10.9743 13.6415 10.9751C13.739 10.976 13.833 10.9389 13.9035 10.8717C14.5565 10.2384 15.3609 9.53712 15.817 9.25634C16.2731 8.97556 16.641 8.89634 16.8177 8.87712C17.165 8.8435 17.5141 8.91922 17.8162 9.09369C17.8694 9.12379 17.918 9.16135 17.9606 9.20525C18.2634 9.51275 18.2451 10.0152 17.9371 10.3181L17.8434 10.4067C17.819 10.4306 17.7996 10.4592 17.7864 10.4908C17.7732 10.5223 17.7664 10.5562 17.7664 10.5904C17.7664 10.6246 17.7732 10.6585 17.7864 10.69C17.7996 10.7216 17.819 10.7502 17.8434 10.7742L19.4517 12.3679C19.4763 12.3922 19.5056 12.4113 19.5379 12.424C19.5701 12.4367 19.6045 12.4428 19.6392 12.442C19.709 12.443 19.7764 12.4163 19.8267 12.3679L22.4263 9.79681C22.4743 9.74615 22.501 9.67905 22.501 9.60931C22.501 9.53957 22.4743 9.47247 22.4263 9.42181V9.42181Z',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }),
  'Flask',
  { sx: { fill: 'none' } },
);
// ===========================================

const Header = styled('header', { shouldForwardProp: (prop) => prop !== 'translucent' })<{
  translucent?: boolean;
}>(({ theme, translucent }) => ({
  minHeight: 112,
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid',
  borderColor: 'transparent',
  transition: '0.3s',
  ...(translucent && {
    minHeight: 64,
    backgroundColor: theme.vars.palette.background.translucent1,
    backdropFilter: 'blur(8px)',
    borderColor: theme.vars.palette.neutral.outlinedBorder,
  }),
}));

const Widget = ({ children, label }: React.PropsWithChildren<{ label: string }>) => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'var(--joy-palette-background-level1)',
        width: 280,
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--joy-borderRadius-md)',
        boxShadow: 'var(--joy-elevation-md)',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: 'var(--joy-palette-background-level1)',
          borderBottomLeftRadius: 'var(--joy-borderRadius-sm)',
          borderBottomRightRadius: 'var(--joy-borderRadius-sm)',
        }}
      >
        <Typography>{label}</Typography>
      </Box>
    </Box>
  );
};

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
          ...theme.variants.outlined.primary,
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
              variant={mode === modeId ? 'contained' : 'text'}
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

const IconWrapper = ({ children }: React.PropsWithChildren<{}>) => (
  <Box
    sx={{
      p: 1,
      borderRadius: 1,
      alignSelf: 'flex-start',
      position: 'relative',
      overflow: 'hidden',
      lineHeight: 0,
      border: '1px solid',
      borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
      color: 'var(--joy-palette-primary-textColor)',
    }}
  >
    <Box
      sx={{
        background: 'var(--joy-palette-gradient-bg)',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.2,
      }}
    />
    {children}
  </Box>
);

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
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              primary: {
                ...blue,
                textColor: 'var(--joy-palette-primary-500)',
                outlinedColor: 'var(--joy-palette-primary-500)',
                outlinedHoverColor: 'var(--joy-palette-primary-500)',
                outlinedBorder: 'var(--joy-palette-primary-500)',
                outlinedHoverBorder: 'var(--joy-palette-primary-500)',
                outlinedHoverBg: 'var(--joy-palette-primary-50)',
              },
              neutral: {
                outlinedBorder: 'var(--joy-palette-neutral-200)',
              },
              gradient: {
                bg: 'conic-gradient(from 225.22deg at 50.39% 50%, #D7021E -69.37deg, #3D62D5 56.21deg, #6C96FF 56.25deg, #FCEEB5 136.88deg, #FDCBD1 217.5deg, #D7021E 290.63deg, #3D62D5 416.21deg)',
                text: 'var(--joy-palette-warning-700), var(--joy-palette-danger-700), var(--joy-palette-primary-700), var(--joy-palette-primary-500)',
              },
              background: {
                translucent1: 'rgba(255, 255, 255, 0.6)',
              },
              shadow: '0deg 0% 73%',
            },
          },
          dark: {
            palette: {
              primary: {
                ...blue,
                outlinedBorder: 'var(--joy-palette-primary-300)',
                outlinedHoverColor: 'var(--joy-palette-primary-100)',
                outlinedHoverBorder: 'var(--joy-palette-primary-300)',
                outlinedHoverBg: 'var(--joy-palette-primary-900)',
              },
              neutral: {
                textHoverColor: '#fff',
                outlinedBorder: 'var(--joy-palette-neutral-600)',
              },
              gradient: {
                bg: 'conic-gradient(from 225.22deg at 50.39% 50%, #121D40 -69.37deg, #3D62D5 56.25deg, #574B19 136.88deg, #48010A 217.5deg, #121D40 290.63deg, #3D62D5 416.25deg)',
                text: 'var(--joy-palette-primary-300), var(--joy-palette-danger-200)',
              },
              background: {
                translucent1: 'rgba(0, 0, 0, 0.6)',
              },
              shadow: '0deg 0% 12%',
            },
          },
        },
        fontFamily: {
          display: '"PlusJakartaSans-ExtraBold", var(--joy-fontFamily-fallback)',
        },
        typography: {
          h5: {
            fontWeight: 'normal',
          },
          overline: {
            fontFamily: 'var(--joy-fontFamily-default)',
            fontWeight: 'var(--joy-fontWeight-xl)',
            fontSize: 'var(--joy-fontSize-default)',
            lineHeight: 'var(--joy-lineHeight-default)',
            textTransform: 'uppercase',
            color: 'var(--joy-palette-primary-textColor)',
          },
        },
        elevation: {
          sm: 'var(--joy-elevationRing), 0.3px 0.8px 1.1px hsl(var(--joy-palette-shadow) / 0.11), 0.5px 1.3px 1.8px -0.6px hsl(var(--joy-palette-shadow) / 0.18), 1.1px 2.7px 3.8px -1.2px hsl(var(--joy-palette-shadow) / 0.26)',
          md: 'var(--joy-elevationRing), 0.3px 0.8px 1.1px hsl(var(--joy-palette-shadow) / 0.12), 1.1px 2.8px 3.9px -0.4px hsl(var(--joy-palette-shadow) / 0.17), 2.4px 6.1px 8.6px -0.8px hsl(var(--joy-palette-shadow) / 0.23), 5.3px 13.3px 18.8px -1.2px hsl(var(--joy-palette-shadow) / 0.29)',
          lg: 'var(--joy-elevationRing), 0.3px 0.8px 1.1px hsl(var(--joy-palette-shadow) / 0.11), 1.8px 4.5px 6.4px -0.2px hsl(var(--joy-palette-shadow) / 0.13), 3.2px 7.9px 11.2px -0.4px hsl(var(--joy-palette-shadow) / 0.16), 4.8px 12px 17px -0.5px hsl(var(--joy-palette-shadow) / 0.19), 7px 17.5px 24.7px -0.7px hsl(var(--joy-palette-shadow) / 0.21), 10.2px 25.5px 36px -0.9px hsl(var(--joy-palette-shadow) / 0.24), 14.8px 36.8px 52.1px -1.1px hsl(var(--joy-palette-shadow) / 0.27), 21px 52.3px 74px -1.2px hsl(var(--joy-palette-shadow) / 0.29)',
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
          },
          ul: {
            listStyle: 'none',
            paddingInlineStart: 0,
            '& > li': {
              marginBottom: '0.25rem',
            },
          },
          '*, *::before, *::after': {
            boxSizing: 'inherit',
          },
          body: {
            margin: 0, // Remove the margin in all browsers.
            backgroundColor: theme.vars.palette.background.default,
            ...theme.typography.body1,
            // Add support for document.body.requestFullScreen().
            // Other elements, if background transparent, are not supported.
            '&::backdrop': {
              backgroundColor: theme.vars.palette.background.default,
            },
          },
        })}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          height: '100vh',
          width: '100%',
          background: 'var(--joy-palette-gradient-bg)',
          filter: 'blur(300px)',
          transform: 'rotate(180deg)',
          mixBlendMode: 'normal',
          zIndex: -1,
          opacity: 0.5,
        }}
      />
      <Header translucent={trigger}>
        <Container sx={{ display: 'flex', alignItems: 'center', maxWidth: { xl: 1536 } }}>
          <SvgMuiLogo />
          <Button square variant="outlined" sx={{ ml: 'auto', mr: 1 }}>
            <Github />
          </Button>
          <ColorSchemePicker />
        </Container>
      </Header>
      <Container sx={{ mt: 14, maxWidth: { xl: 1536 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 4, md: 8, lg: 2 },
            flexWrap: { xs: 'wrap', lg: 'nowrap' },
          }}
        >
          <Box sx={{ maxWidth: 620, flexShrink: { md: 0 } }}>
            <Typography level="overline">MUI Presents</Typography>
            <Typography level="h1" sx={{ my: 2 }}>
              A design system for you to <br />
              <GradientText>start quick and look great</GradientText>
            </Typography>
            <Typography sx={{ mb: 4 }} level="h5">
              Joy is a new design system being built on top of MUI's unstyled components. With a
              beautiful and opinionated default theme, you'll be able to develop React UIs faster
              while looking great.
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Development still in early stage. Subscribe to the newsletter for updates
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, maxWidth: 400 }}>
              <Input placeholder="Enter your email" sx={{ flexGrow: 1 }} />
              <Button>Subscribe</Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(4, 1fr)', lg: 'repeat(2, 1fr)' },
              gap: 2,
              mx: { xs: -2, sm: -3, lg: 'auto' },
              px: { xs: 2, sm: 3, lg: 0 },
              overflowX: { xs: 'auto', lg: 'initial' },
              py: 3,
              '::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <Widget label="Tabs" />
            <Widget label="Menu" />
            <Widget label="Switch" />
            <Widget label="Button" />
          </Box>
        </Box>
      </Container>
      <Container sx={{ my: 24, maxWidth: { xl: 1536 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography level="h2">
              The next step for{' '}
              <Box component="br" sx={{ display: { xs: 'none', md: 'inline' } }} />{' '}
              <GradientText>design systems</GradientText>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mb: 4, maxWidth: 700 }}>
              Every year, we run a survey to touch base and see how our developer community is
              feeling about MUI. Last year, we noticed a strong pull for a different design
              direction and also a lot of requests for upgrading the customization experience.
              <br />
              <br />
              This year, we launched MUI Core v5, which already brings a bunch of updates that make
              customization easier. And now, we'll be exploring them further in a brand new,
              open-source, design system.
            </Typography>
            <Button variant="outlined" size="large">
              Check the available RFCs
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ my: 24, maxWidth: { xl: 1536 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography level="h2" sx={{ mb: 3 }}>
              <GradientText>What you can expect</GradientText>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'min-content auto',
                gap: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <IconWrapper>
                <Sparkles />
              </IconWrapper>
              <Box sx={{ mb: 4 }}>
                <Typography level="h4" sx={{ mb: 1 }}>
                  A new and great design out of the box
                </Typography>
                <Typography sx={{ maxWidth: 700 }}>
                  Up until now, we focused on implementing Material Design. Developers have grown
                  tired of having their apps looking like just another Google product. With Joy,
                  you'll have access to the quality of development we strive to have in the Material
                  components but now, with a beautiful, different and opinionated, default theme.
                </Typography>
              </Box>

              <IconWrapper>
                <Hammer />
              </IconWrapper>
              <Box sx={{ mb: 4 }}>
                <Typography level="h4" sx={{ mb: 1 }}>
                  Customization tools to make it look your own
                </Typography>
                <Typography sx={{ maxWidth: 700 }}>
                  Along with the newly introduced `sx prop` and migration to emotion on the
                  `@mui/material` package, we'll be introducing CSS variables to Joy, to add even
                  more to how easy will be to customize the default theme and make the components
                  follow your brand indentity.
                </Typography>
              </Box>

              <IconWrapper>
                <Flask />
              </IconWrapper>
              <Box sx={{ mb: 4 }}>
                <Typography level="h4" sx={{ mb: 1 }}>
                  A laboratory for experimenting
                </Typography>
                <Typography sx={{ maxWidth: 700 }}>
                  Many teams and companies rely on `@mui/material` for their design systems, which
                  adds risk to experimenting with new stuff. Joy, will be the lab to experiment
                  different approaches and test bold ideas. As they get mature, they'll be available
                  for the Material package as well.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ maxWidth: { xl: 1536 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm>
            <SvgMuiLogo />
            <Typography sx={{ mb: 3, mt: 8 }}>
              Development still in early stage. Subscribe to the newsletter for updates
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, maxWidth: 400 }}>
              <Input placeholder="Enter your email" sx={{ flexGrow: 1 }} />
              <Button>Subscribe</Button>
            </Box>
          </Grid>
          <Grid item xs={6} sm="auto">
            <Box sx={{ minWidth: 144 }}>
              <Typography sx={{ color: 'text.tertiary', mb: 1 }} level="body2">
                Product
              </Typography>
              <Box component="ul">
                <li>
                  <Typography level="body2">MUI Core</Typography>
                </li>
                <li>
                  <Typography level="body2">Templates</Typography>
                </li>
                <li>
                  <Typography level="body2">Design Kits</Typography>
                </li>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm="auto">
            <Box sx={{ minWidth: 120 }}>
              <Typography sx={{ color: 'text.tertiary', mb: 1 }} level="body2">
                Company
              </Typography>
              <Box component="ul">
                <li>
                  <Typography level="body2">About</Typography>
                </li>
                <li>
                  <Typography level="body2">Vision</Typography>
                </li>
                <li>
                  <Typography level="body2">Careers</Typography>
                </li>
                <li>
                  <Typography level="body2">Blog</Typography>
                </li>
                <li>
                  <Typography level="body2">Support</Typography>
                </li>
                <li>
                  <Typography level="body2">Contact us</Typography>
                </li>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box
          component="hr"
          sx={{
            mt: 8,
            mb: 3,
            borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
            borderStyle: 'solid',
            borderBottom: 0,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: 8,
            flexWrap: 'wrap',
          }}
        >
          <Typography level="body3" sx={{ color: 'text.tertiary' }}>
            Copyright 2021 Material-UI SAS.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button square variant="text" color="neutral" sx={{ ml: 'auto' }}>
              <Github />
            </Button>
            <Button square variant="text" color="neutral">
              <SvgStackOverflow />
            </Button>
            <Button square variant="text" color="neutral">
              <Twitter />
            </Button>
            <Button square variant="text" color="neutral">
              <LinkedIn />
            </Button>
          </Box>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}

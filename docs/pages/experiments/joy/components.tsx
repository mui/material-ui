import * as React from 'react';
// @ts-ignore
import { jsx as _jsx } from 'react/jsx-runtime';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import {
  CssVarsProvider,
  styled,
  useColorScheme,
  ColorPaletteProp,
  TypographySystem,
  FontSize,
} from '@mui/joy/styles';

export const SvgIcon = styled('svg', {
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

const Typography = styled('p', {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'level' && prop !== 'sx',
})<{ color?: ColorPaletteProp; level?: keyof TypographySystem }>(
  ({ theme, level = 'body1', color }) => [
    { margin: 0 },
    theme.typography[level],
    color && { color: `var(--joy-palette-${color}-textColor)` },
  ],
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

export default function JoyComponents() {
  return (
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ColorSchemePicker />
        </Box>
        <Typography level="h5" sx={{ my: 1 }}>
          Small
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              border: 1,
              borderColor: 'neutral.outlinedBorder',
            }}
          >
            <Button size="small">Contained</Button>
            <Button variant="light" size="small">
              Light
            </Button>
            <Button variant="outlined" size="small">
              Outlined
            </Button>
            <Button variant="text" size="small">
              Text
            </Button>
          </Box>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              border: 1,
              borderColor: 'neutral.outlinedBorder',
              ml: '-1px',
            }}
          >
            <Button size="small" elevation="md">
              Contained
            </Button>
            <Button variant="light" size="small" elevation="md">
              Light
            </Button>
            <Button variant="outlined" size="small" elevation="md">
              Outlined
            </Button>
            <Button variant="text" size="small" elevation="md">
              Text
            </Button>
          </Box>
        </Box>

        <Typography level="h5" sx={{ mt: 4, mb: 1 }}>
          Default
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              border: 1,
              borderColor: 'neutral.outlinedBorder',
            }}
          >
            <Button>Contained</Button>
            <Button variant="light">Light</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
          </Box>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              border: 1,
              borderColor: 'neutral.outlinedBorder',
              ml: '-1px',
            }}
          >
            <Button elevation="md">Contained</Button>
            <Button variant="light" elevation="md">
              Light
            </Button>
            <Button variant="outlined" elevation="md">
              Outlined
            </Button>
            <Button variant="text" elevation="md">
              Text
            </Button>
          </Box>
        </Box>

        <Typography level="h5" sx={{ mt: 4, mb: 1 }}>
          Large
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              border: 1,
              borderColor: 'neutral.outlinedBorder',
            }}
          >
            <Button size="large">Contained</Button>
            <Button variant="light" size="large">
              Light
            </Button>
            <Button variant="outlined" size="large">
              Outlined
            </Button>
            <Button variant="text" size="large">
              Text
            </Button>
          </Box>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              border: 1,
              borderColor: 'neutral.outlinedBorder',
              ml: '-1px',
            }}
          >
            <Button size="large" elevation="md">
              Contained
            </Button>
            <Button variant="light" size="large" elevation="md">
              Light
            </Button>
            <Button variant="outlined" size="large" elevation="md">
              Outlined
            </Button>
            <Button variant="text" size="large" elevation="md">
              Text
            </Button>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

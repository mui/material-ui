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
  const buttonProps = {
    variant: ['text', 'outlined', 'light', 'contained'],
    color: ['primary', 'neutral', 'danger', 'info', 'success', 'warning'],
    size: ['sm', 'md', 'lg'],
  } as const;
  return (
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3, pb: 4 }}>
          <ColorSchemePicker />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {Object.entries(buttonProps).map(([propName, propValue]) => (
            <Box
              key={propName}
              sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
            >
              <Typography level="body2" sx={{ fontWeight: 'bold' }}>
                {propName}
              </Typography>
              {propValue.map((value) => (
                <Box key={value}>
                  <Button {...{ [propName]: value }}>Button</Button>
                  <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                    {value || 'default'}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
        {/* Danilo's not smart iteration below 😅 - wanted to see each color with every variant. */}
        <Box sx={{ display: 'flex', py: 16 }}>
          <Box sx={{ width: '100px', display: 'grid', gap: 2, mr: 4 }}>
            <Button variant="contained" color="primary">
              Button
            </Button>
            <Button variant="contained" color="neutral">
              Button
            </Button>
            <Button variant="contained" color="danger">
              Button
            </Button>
            <Button variant="contained" color="info">
              Button
            </Button>
            <Button variant="contained" color="success">
              Button
            </Button>
            <Button variant="contained" color="warning">
              Button
            </Button>
          </Box>
          <Box sx={{ width: '100px', display: 'grid', gap: 2, mr: 4 }}>
            <Button variant="outlined" color="primary">
              Button
            </Button>
            <Button variant="outlined" color="neutral">
              Button
            </Button>
            <Button variant="outlined" color="danger">
              Button
            </Button>
            <Button variant="outlined" color="info">
              Button
            </Button>
            <Button variant="outlined" color="success">
              Button
            </Button>
            <Button variant="outlined" color="warning">
              Button
            </Button>
          </Box>
          <Box sx={{ width: '100px', display: 'grid', gap: 2, mr: 4 }}>
            <Button variant="light" color="primary">
              Button
            </Button>
            <Button variant="light" color="neutral">
              Button
            </Button>
            <Button variant="light" color="danger">
              Button
            </Button>
            <Button variant="light" color="info">
              Button
            </Button>
            <Button variant="light" color="success">
              Button
            </Button>
            <Button variant="light" color="warning">
              Button
            </Button>
          </Box>
          <Box sx={{ width: '100px', display: 'grid', gap: 2, mr: 4 }}>
            <Button variant="text" color="primary">
              Button
            </Button>
            <Button variant="text" color="neutral">
              Button
            </Button>
            <Button variant="text" color="danger">
              Button
            </Button>
            <Button variant="text" color="info">
              Button
            </Button>
            <Button variant="text" color="success">
              Button
            </Button>
            <Button variant="text" color="warning">
              Button
            </Button>
          </Box>
          <Box sx={{ width: '100px', display: 'grid' }}>
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-50)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-100)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-200)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-300)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-400)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-500)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-600)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-700)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-800)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-900)',
              }}
            />
          </Box>
          <Box sx={{ width: '100px', display: 'grid' }}>
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-50)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-100)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-200)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-300)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-400)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-500)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-600)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-700)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-800)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-900)',
              }}
            />
          </Box>
          <Box sx={{ width: '100px', display: 'grid' }}>
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-50)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-100)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-200)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-300)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-400)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-500)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-600)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-700)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-800)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-900)',
              }}
            />
          </Box>
          <Box sx={{ width: '100px', display: 'grid' }}>
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-50)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-100)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-200)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-300)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-400)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-500)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-600)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-700)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-800)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-900)',
              }}
            />
          </Box>
          <Box sx={{ width: '100px', display: 'grid' }}>
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-50)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-100)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-200)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-300)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-400)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-500)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-600)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-700)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-800)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-900)',
              }}
            />
          </Box>
          <Box sx={{ width: '100px', display: 'grid' }}>
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-50)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-100)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-200)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-300)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-400)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-500)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-600)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-700)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-800)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-900)',
              }}
            />
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

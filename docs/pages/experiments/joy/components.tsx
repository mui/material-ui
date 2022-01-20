import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import {
  CssVarsProvider,
  styled,
  useColorScheme,
  ColorPaletteProp,
  TypographySystem,
} from '@mui/joy/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';

const Typography = styled('p', {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'level' && prop !== 'sx',
})<{ color?: ColorPaletteProp; level?: keyof TypographySystem }>(
  ({ theme, level = 'body1', color }) => [
    { margin: 0 },
    theme.typography[level],
    color && { color: `var(--joy-palette-${color}-textColor)` },
  ],
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
    <CssVarsProvider
      theme={{
        components: {
          MuiSvgIcon: {
            defaultProps: {
              fontSize: 'xl',
            },
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                ...(ownerState.fontSize &&
                  ownerState.fontSize !== 'inherit' && {
                    fontSize: theme.vars.fontSize[ownerState.fontSize],
                  }),
                ...(ownerState.color &&
                  ownerState.color !== 'inherit' && {
                    color: theme.vars.palette[ownerState.color].textColor,
                  }),
              }),
            },
          },
        },
      }}
    >
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

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  cssVariables: {
    nativeColor: true,
    cssVarPrefix: 'demo', // This is for the demo only, you don't need to set this to use the feature
  },
});

const colorSwatches = [
  { color: theme.palette.primary.main, key: 'primary' as const },
  { color: theme.palette.secondary.main, key: 'secondary' as const },
  { color: theme.palette.error.main, key: 'error' as const },
  { color: theme.palette.warning.main, key: 'warning' as const },
  { color: theme.palette.info.main, key: 'info' as const },
  { color: theme.palette.success.main, key: 'success' as const },
];

export default function ThemeColorFunctions() {
  const [selectedColor, setSelectedColor] = React.useState(colorSwatches[0]);

  const colorValues = {
    alpha: theme.alpha(selectedColor.color, 0.5),
    lighten: theme.lighten(selectedColor.color, 0.5),
    darken: theme.darken(selectedColor.color, 0.5),
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2 }}>
        {/* Color Swatches */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          {colorSwatches.map((swatch) => {
            const isSelected = selectedColor.key === swatch.key;
            return (
              <Button
                key={swatch.key}
                variant={isSelected ? 'contained' : 'outlined'}
                color={swatch.key}
                onClick={() => setSelectedColor(swatch)}
                sx={{
                  width: 56,
                  height: 56,
                  minWidth: 56,
                  p: 0,
                  fontSize: '0.625rem',
                  fontFamily: 'monospace',
                }}
              >
                {swatch.color}
              </Button>
            );
          })}
        </Box>

        {/* Function Results */}
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {/* Alpha Function */}
          <div>
            <Typography variant="subtitle2" gutterBottom fontWeight="medium">
              theme.alpha(color, 0.5)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: colorValues.alpha,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <Typography
                variant="caption"
                fontFamily="monospace"
                color="text.secondary"
                sx={{ wordBreak: 'break-all' }}
              >
                {colorValues.alpha}
              </Typography>
            </Box>
          </div>

          {/* Lighten Function */}
          <div>
            <Typography variant="subtitle2" gutterBottom fontWeight="medium">
              theme.lighten(color, 0.5)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: colorValues.lighten,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <Typography
                variant="caption"
                fontFamily="monospace"
                color="text.secondary"
                sx={{ wordBreak: 'break-all' }}
              >
                {colorValues.lighten}
              </Typography>
            </Box>
          </div>

          {/* Darken Function */}
          <div>
            <Typography variant="subtitle2" gutterBottom fontWeight="medium">
              theme.darken(color, 0.5)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: colorValues.darken,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <Typography
                variant="caption"
                fontFamily="monospace"
                color="text.secondary"
                sx={{ wordBreak: 'break-all' }}
              >
                {colorValues.darken}
              </Typography>
            </Box>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

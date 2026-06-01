'use client';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// 100 sliders rendered with Emotion + sx prop.
// Each slider receives a unique sx override so Emotion generates a distinct class.

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
  colorSchemes: { light: true, dark: true },
});

const COLORS = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
const SIZES = ['small', 'medium'] as const;

type SliderConfig = {
  color: (typeof COLORS)[number];
  size: (typeof SIZES)[number];
  defaultValue: number;
  disabled: boolean;
  marks: boolean;
  // sx values that vary per instance so Emotion can't cache a single class
  thumbSize: number;
  trackHeight: number;
  opacity: number;
};

function buildConfigs(count: number): SliderConfig[] {
  return Array.from({ length: count }, (_, i) => ({
    color: COLORS[i % COLORS.length],
    size: SIZES[i % SIZES.length],
    defaultValue: (i * 13) % 100,
    disabled: i % 10 === 9,
    marks: i % 3 === 0,
    thumbSize: 16 + (i % 8),
    trackHeight: 3 + (i % 5),
    opacity: 0.7 + (i % 4) * 0.075,
  }));
}

const configs = buildConfigs(100);

export default function SliderEmotionBenchmark() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          Emotion + sx Slider benchmark
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
          100 sliders — Emotion engine, ThemeProvider, each with a unique sx override.
        </Typography>

        <Stack spacing={3}>
          {configs.map((cfg, i) => (
            <Box key={i}>
              <Typography
                variant="caption"
                sx={{ color: 'text.disabled', display: 'block', mb: 0.5 }}
              >
                #{i + 1} · color={cfg.color} · size={cfg.size} · thumbSize={cfg.thumbSize}
                {cfg.disabled ? ' · disabled' : ''}
                {cfg.marks ? ' · marks' : ''}
              </Typography>
              <Slider
                defaultValue={cfg.defaultValue}
                color={cfg.color}
                size={cfg.size}
                disabled={cfg.disabled}
                marks={cfg.marks}
                sx={{
                  '& .MuiSlider-thumb': {
                    width: cfg.thumbSize,
                    height: cfg.thumbSize,
                  },
                  '& .MuiSlider-track': {
                    height: cfg.trackHeight,
                  },
                  opacity: cfg.opacity,
                }}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

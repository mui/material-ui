/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import { BrandingProvider } from '@mui/docs/branding';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import Typography from '@mui/material/Typography';

/**
 * This demo allows users to experiment with different color spaces (OKLCH, HSL, sRGB, and Display-P3)
 * and dynamically adjust their channels (e.g., lightness, chroma, hue, etc.) using sliders.
 * The selected color is applied as the primary color in the Material-UI theme, and the resulting
 * CSS variables and theme configuration are displayed for reference.
 */

export default function ColorMixPage() {
  const [primary, setPrimary] = React.useState('oklch(80% 0.30 50)');
  const [colorSpace, setColorSpace] = React.useState<'oklch' | 'hsl' | 'srgb' | 'display-p3'>(
    'oklch',
  );
  const [channels, setChannels] = React.useState([80, 0.3, 50]);

  const handleChannelChange = (index: number, newValue: number | number[]) => {
    const updatedChannels = [...channels];
    updatedChannels[index] = newValue as number;
    setChannels(updatedChannels);

    let newColor;
    if (colorSpace === 'oklch') {
      newColor = `oklch(${updatedChannels[0]}% ${updatedChannels[1]} ${updatedChannels[2]})`;
    } else if (colorSpace === 'hsl') {
      newColor = `hsl(${updatedChannels[0]} ${updatedChannels[1]}% ${updatedChannels[2]}%)`;
    } else if (colorSpace === 'srgb') {
      newColor = `rgb(${updatedChannels[0]}, ${updatedChannels[1]}, ${updatedChannels[2]})`;
    } else {
      newColor = `color(display-p3 ${updatedChannels[0]} ${updatedChannels[1]} ${updatedChannels[2]})`;
    }

    setPrimary(newColor);
  };

  const sliderConfig = {
    oklch: [
      { min: 0, max: 100, step: 1 }, // Lightness
      { min: 0, max: 1, step: 0.01 }, // Chroma
      { min: 0, max: 360, step: 1 }, // Hue
    ],
    hsl: [
      { min: 0, max: 360, step: 1 }, // Hue
      { min: 0, max: 100, step: 1 }, // Saturation
      { min: 0, max: 100, step: 1 }, // Lightness
    ],
    srgb: [
      { min: 0, max: 255, step: 1 }, // Red
      { min: 0, max: 255, step: 1 }, // Green
      { min: 0, max: 255, step: 1 }, // Blue
    ],
    'display-p3': [
      { min: 0, max: 1, step: 0.01 }, // Red
      { min: 0, max: 1, step: 0.01 }, // Green
      { min: 0, max: 1, step: 0.01 }, // Blue
    ],
  };

  return (
    <ThemeProvider
      disableNestedContext
      theme={createTheme({
        cssVariables: {
          experimentalNativeColorSyntax: true,
        },
        colorSchemes: {
          light: {
            palette: { primary: { main: primary } },
          },
        },
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: 600, textAlign: 'center', mb: 4 }}>
          <Typography variant="h1">RCS</Typography>
          <Typography>
            This demo demonstrates the ability to use different color spaces in Material-UI. When
            experimental flag is enabled, Material UI will generate <code>light</code>,{' '}
            <code>dark</code>, and <code>constrastText</code> using pure CSS functions (color-mix
            and relative color syntax).
          </Typography>
        </Box>
        <Box sx={{ width: 360 }}>
          <Select
            value={colorSpace}
            onChange={(event) => {
              const newColorSpace = event.target.value;
              setColorSpace(newColorSpace);
              // Reset channels for the new color space
              setChannels(
                newColorSpace === 'oklch'
                  ? [80, 0.3, 50]
                  : newColorSpace === 'hsl'
                    ? [255, 50, 50]
                    : newColorSpace === 'srgb'
                      ? [255, 0, 0]
                      : [1, 0, 0],
              );
            }}
            fullWidth
          >
            <MenuItem value="oklch">OKLCH</MenuItem>
            <MenuItem value="hsl">HSL</MenuItem>
            <MenuItem value="srgb">sRGB</MenuItem>
            <MenuItem value="display-p3">Display-P3</MenuItem>
          </Select>
          {channels.map((channel, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Slider
                value={channel}
                onChange={(event, newValue) => handleChannelChange(index, newValue)}
                min={sliderConfig[colorSpace][index].min}
                max={sliderConfig[colorSpace][index].max}
                step={sliderConfig[colorSpace][index].step}
                valueLabelDisplay="auto"
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="text" color="primary">
            Text
          </Button>
          <Button variant="contained" color="primary">
            Contained
          </Button>
          <Button variant="outlined" color="primary">
            Outlined
          </Button>
        </Box>
        <div>
          <BrandingProvider mode="light">
            <HighlightedCode
              language="javascript"
              code={`extendTheme({
  cssVariables: {
    experimentalNativeColorSyntax: true,
  },
  colorSchemes: {
    light: {
      palette: { primary: { main: '${primary}' } },
    },
  },
})`}
            />
          </BrandingProvider>
          <BrandingProvider mode="light">
            <HighlightedCode
              language="css"
              code={`
--mui-palette-primary-main: ${primary};
--mui-palette-primary-light:
  color-mix(in oklch, ${primary}, #fff 20%);
--mui-palette-primary-dark:
  color-mix(in oklch, ${primary}, #000 30%);
--mui-palette-primary-contrastText:
  oklch(from var(--mui-palette-primary-main) var(--__l) 0 h / var(--__a));
`}
            />
          </BrandingProvider>
        </div>
      </Box>
    </ThemeProvider>
  );
}

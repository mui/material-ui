import * as React from 'react';
import Box from '@mui/material/Box';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { Carousel } from '@mui/carousel';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({ direction: 'rtl' });

/**
 * RTL layout testing fixture:
 * - Wrapped in RTL direction context
 * - Verifies navigation icons swap correctly
 * - Tests indicator positioning in RTL
 */
export default function CarouselRTL() {
  const slides = [
    { label: 'שקופית 1', color: '#1976d2' },
    { label: 'שקופית 2', color: '#dc004e' },
    { label: 'שקופית 3', color: '#388e3c' },
  ];

  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Box dir="rtl" sx={{ width: 400 }}>
            <Carousel>
              {slides.map((slide) => (
                <Box
                  key={slide.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 180,
                    backgroundColor: slide.color,
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                >
                  {slide.label}
                </Box>
              ))}
            </Carousel>
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </StyleSheetManager>
  );
}

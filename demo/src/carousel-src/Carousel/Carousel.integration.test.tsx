import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { prefixer } from 'stylis';
import Carousel from './Carousel';

describe('<Carousel /> integration', () => {
  const { render } = createRenderer();
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  const defaultSlides = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>,
  ];

  describe('with MUI Card component', () => {
    it('should render correctly inside a Card', () => {
      const theme = createTheme();

      render(
        <ThemeProvider theme={theme}>
          <Card>
            <CardContent>
              <Carousel>{defaultSlides}</Carousel>
            </CardContent>
          </Card>
        </ThemeProvider>,
      );

      expect(screen.getByRole('region')).to.not.equal(null);
      expect(screen.getByText('Slide 1')).to.not.equal(null);
      expect(screen.getByRole('tablist')).to.not.equal(null);
    });

    it('should inherit Card styles correctly', () => {
      const theme = createTheme();

      const { container } = render(
        <ThemeProvider theme={theme}>
          <Card sx={{ backgroundColor: 'primary.main' }}>
            <CardContent>
              <Carousel>{defaultSlides}</Carousel>
            </CardContent>
          </Card>
        </ThemeProvider>,
      );

      expect(container.querySelector('.MuiCard-root')).to.not.equal(null);
      expect(screen.getByRole('region')).to.not.equal(null);
    });
  });

  describe('with MUI Paper component', () => {
    it('should render correctly inside Paper', () => {
      const theme = createTheme();

      render(
        <ThemeProvider theme={theme}>
          <Paper elevation={3}>
            <Carousel>{defaultSlides}</Carousel>
          </Paper>
        </ThemeProvider>,
      );

      expect(screen.getByRole('region')).to.not.equal(null);
      expect(screen.getByText('Slide 1')).to.not.equal(null);
    });

    it('should render correctly inside Paper with different elevations', () => {
      const theme = createTheme();

      const { rerender } = render(
        <ThemeProvider theme={theme}>
          <Paper elevation={0}>
            <Carousel>{defaultSlides}</Carousel>
          </Paper>
        </ThemeProvider>,
      );

      expect(screen.getByRole('region')).to.not.equal(null);

      rerender(
        <ThemeProvider theme={theme}>
          <Paper elevation={24}>
            <Carousel>{defaultSlides}</Carousel>
          </Paper>
        </ThemeProvider>,
      );

      expect(screen.getByRole('region')).to.not.equal(null);
    });
  });

  describe('with MUI Dialog component', () => {
    it('should render correctly inside a Dialog', () => {
      const theme = createTheme();

      render(
        <ThemeProvider theme={theme}>
          <Dialog open>
            <DialogContent>
              <Carousel>{defaultSlides}</Carousel>
            </DialogContent>
          </Dialog>
        </ThemeProvider>,
      );

      expect(screen.getByRole('region')).to.not.equal(null);
      expect(screen.getByText('Slide 1')).to.not.equal(null);
    });

    it('should handle modal context correctly', () => {
      const theme = createTheme();

      render(
        <ThemeProvider theme={theme}>
          <Dialog open aria-labelledby="dialog-title">
            <DialogContent>
              <div id="dialog-title">Image Gallery</div>
              <Carousel>{defaultSlides}</Carousel>
            </DialogContent>
          </Dialog>
        </ThemeProvider>,
      );

      // Both dialog and carousel should have proper ARIA roles
      expect(screen.getByRole('dialog')).to.not.equal(null);
      expect(screen.getByRole('region')).to.not.equal(null);
    });
  });

  describe('with custom themes', () => {
    it('should work with light theme', () => {
      const lightTheme = createTheme({
        palette: {
          mode: 'light',
          primary: { main: '#1976d2' },
        },
      });

      render(
        <ThemeProvider theme={lightTheme}>
          <Carousel>{defaultSlides}</Carousel>
        </ThemeProvider>,
      );

      expect(screen.getByRole('region')).to.not.equal(null);
      expect(screen.getByText('Slide 1')).to.not.equal(null);
    });

    it('should work with dark theme', () => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: { main: '#90caf9' },
        },
      });

      render(
        <ThemeProvider theme={darkTheme}>
          <Carousel>{defaultSlides}</Carousel>
        </ThemeProvider>,
      );

      expect(screen.getByRole('region')).to.not.equal(null);
      expect(screen.getByText('Slide 1')).to.not.equal(null);
    });

    it('should apply custom theme spacing', () => {
      const customTheme = createTheme({
        spacing: 10, // 10px base spacing
      });

      render(
        <ThemeProvider theme={customTheme}>
          <Carousel spacing={2}>{defaultSlides}</Carousel>
        </ThemeProvider>,
      );

      expect(screen.getByRole('region')).to.not.equal(null);
    });

    it('should work with custom palette colors', () => {
      const customTheme = createTheme({
        palette: {
          primary: {
            main: '#ff5722',
          },
          secondary: {
            main: '#00bcd4',
          },
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <Carousel>{defaultSlides}</Carousel>
        </ThemeProvider>,
      );

      expect(screen.getByRole('region')).to.not.equal(null);
    });
  });

  describe('with theme density variations', () => {
    it('should work with dense theme', () => {
      const denseTheme = createTheme({
        components: {
          MuiButton: {
            defaultProps: {
              size: 'small',
            },
          },
        },
      });

      render(
        <ThemeProvider theme={denseTheme}>
          <Carousel>{defaultSlides}</Carousel>
        </ThemeProvider>,
      );

      expect(screen.getByRole('region')).to.not.equal(null);
    });
  });

  describe('RTL support', () => {
    it('should render correctly in RTL mode', () => {
      const rtlCache = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
      });

      const rtlTheme = createTheme({ direction: 'rtl' });

      render(
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={rtlTheme}>
            <div dir="rtl">
              <Carousel>{defaultSlides}</Carousel>
            </div>
          </ThemeProvider>
        </CacheProvider>,
      );

      expect(screen.getByRole('region')).to.not.equal(null);
      expect(screen.getByText('Slide 1')).to.not.equal(null);
    });

    it('should maintain navigation functionality in RTL', () => {
      const rtlCache = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
      });

      const rtlTheme = createTheme({ direction: 'rtl' });

      render(
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={rtlTheme}>
            <div dir="rtl">
              <Carousel>{defaultSlides}</Carousel>
            </div>
          </ThemeProvider>
        </CacheProvider>,
      );

      // Navigation buttons should still be present
      expect(screen.getByLabelText('Go to previous slide')).to.not.equal(null);
      expect(screen.getByLabelText('Go to next slide')).to.not.equal(null);
    });

    it('should have indicators in RTL mode', () => {
      const rtlCache = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
      });

      const rtlTheme = createTheme({ direction: 'rtl' });

      render(
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={rtlTheme}>
            <div dir="rtl">
              <Carousel>{defaultSlides}</Carousel>
            </div>
          </ThemeProvider>
        </CacheProvider>,
      );

      expect(screen.getByRole('tablist')).to.not.equal(null);
      expect(screen.getAllByRole('tab')).to.have.length(3);
    });
  });

  describe('nested in multiple MUI containers', () => {
    it('should render correctly when deeply nested', () => {
      const theme = createTheme();

      render(
        <ThemeProvider theme={theme}>
          <Paper>
            <Card>
              <CardContent>
                <Carousel>{defaultSlides}</Carousel>
              </CardContent>
            </Card>
          </Paper>
        </ThemeProvider>,
      );

      expect(screen.getByRole('region')).to.not.equal(null);
      expect(screen.getByText('Slide 1')).to.not.equal(null);
    });
  });
});

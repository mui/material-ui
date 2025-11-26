import * as React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
  CardMedia,
} from '@mui/material';
import { Carousel } from '@mui/carousel';
import { ToggleControl, NumberControl, SelectControl, SliderControl } from './PropControl';
import {
  generateCodeSnippet,
  CarouselPlaygroundProps,
  DEFAULTS,
} from '../utils/codeGenerator';
import { imageSlides } from '../data/sampleData';

export default function InteractivePlayground() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Prop state
  const [autoPlay, setAutoPlay] = React.useState(DEFAULTS.autoPlay);
  const [autoPlayInterval, setAutoPlayInterval] = React.useState(DEFAULTS.autoPlayInterval);
  const [enableLoop, setEnableLoop] = React.useState(DEFAULTS.enableLoop);
  const [hideNavigation, setHideNavigation] = React.useState(DEFAULTS.hideNavigation);
  const [hideIndicators, setHideIndicators] = React.useState(DEFAULTS.hideIndicators);
  const [disableGestures, setDisableGestures] = React.useState(DEFAULTS.disableGestures);
  const [disableKeyboard, setDisableKeyboard] = React.useState(DEFAULTS.disableKeyboard);
  const [transition, setTransition] = React.useState<'slide' | 'fade'>(DEFAULTS.transition);
  const [transitionDuration, setTransitionDuration] = React.useState(DEFAULTS.transitionDuration);
  const [slidesPerView, setSlidesPerView] = React.useState(DEFAULTS.slidesPerView);
  const [spacing, setSpacing] = React.useState(DEFAULTS.spacing);

  // Controlled mode - always controlled in playground to demonstrate external control
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [showExternalControl, setShowExternalControl] = React.useState(false);

  const currentProps: CarouselPlaygroundProps = {
    autoPlay,
    autoPlayInterval,
    enableLoop,
    hideNavigation,
    hideIndicators,
    disableGestures,
    disableKeyboard,
    transition,
    transitionDuration,
    slidesPerView,
    spacing,
  };

  const codeSnippet = generateCodeSnippet(currentProps);

  const handleReset = () => {
    setAutoPlay(DEFAULTS.autoPlay);
    setAutoPlayInterval(DEFAULTS.autoPlayInterval);
    setEnableLoop(DEFAULTS.enableLoop);
    setHideNavigation(DEFAULTS.hideNavigation);
    setHideIndicators(DEFAULTS.hideIndicators);
    setDisableGestures(DEFAULTS.disableGestures);
    setDisableKeyboard(DEFAULTS.disableKeyboard);
    setTransition(DEFAULTS.transition);
    setTransitionDuration(DEFAULTS.transitionDuration);
    setSlidesPerView(DEFAULTS.slidesPerView);
    setSpacing(DEFAULTS.spacing);
    setActiveIndex(0);
    setShowExternalControl(false);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Controls Panel */}
        <Grid item xs={12} md={4}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              height: '100%',
              maxHeight: isMobile ? 'none' : 600,
              overflow: 'auto',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Controls
            </Typography>

            {/* Boolean Props */}
            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
              Features
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <ToggleControl
                label="Auto-play"
                value={autoPlay}
                onChange={setAutoPlay}
              />
              <ToggleControl
                label="Enable Loop"
                value={enableLoop}
                onChange={setEnableLoop}
              />
              <ToggleControl
                label="Hide Navigation"
                value={hideNavigation}
                onChange={setHideNavigation}
              />
              <ToggleControl
                label="Hide Indicators"
                value={hideIndicators}
                onChange={setHideIndicators}
              />
              <ToggleControl
                label="Disable Gestures"
                value={disableGestures}
                onChange={setDisableGestures}
              />
              <ToggleControl
                label="Disable Keyboard"
                value={disableKeyboard}
                onChange={setDisableKeyboard}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Number Props */}
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Timing & Layout
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <NumberControl
                label="Interval (ms)"
                value={autoPlayInterval}
                onChange={setAutoPlayInterval}
                min={1000}
                max={10000}
                step={500}
              />
              <NumberControl
                label="Duration (ms)"
                value={transitionDuration}
                onChange={setTransitionDuration}
                min={100}
                max={2000}
                step={50}
              />
              <NumberControl
                label="Slides Per View"
                value={slidesPerView}
                onChange={setSlidesPerView}
                min={1}
                max={4}
              />
              <NumberControl
                label="Spacing (px)"
                value={spacing}
                onChange={setSpacing}
                min={0}
                max={32}
                step={4}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Select Props */}
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Transition
            </Typography>
            <SelectControl
              label="Transition"
              value={transition}
              onChange={setTransition}
              options={[
                { value: 'slide', label: 'Slide' },
                { value: 'fade', label: 'Fade' },
              ]}
            />

            <Divider sx={{ my: 2 }} />

            {/* External Control */}
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              External Control
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <ToggleControl
                label="Show Slider Control"
                value={showExternalControl}
                onChange={setShowExternalControl}
              />
              {showExternalControl && (
                <SliderControl
                  label="Active Index"
                  value={activeIndex}
                  onChange={setActiveIndex}
                  min={0}
                  max={imageSlides.length - 1}
                />
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Reset Button */}
            <Button variant="outlined" fullWidth onClick={handleReset}>
              Reset to Defaults
            </Button>
          </Paper>
        </Grid>

        {/* Preview Panel */}
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Live Preview
            </Typography>

            {/* Carousel Preview */}
            <Box sx={{ mb: 3 }}>
              <Carousel
                autoPlay={autoPlay}
                autoPlayInterval={autoPlayInterval}
                enableLoop={enableLoop}
                hideNavigation={hideNavigation}
                hideIndicators={hideIndicators}
                disableGestures={disableGestures}
                disableKeyboard={disableKeyboard}
                transition={transition}
                transitionDuration={transitionDuration}
                slidesPerView={slidesPerView}
                spacing={spacing}
                activeIndex={activeIndex}
                onChange={(_, newIndex) => setActiveIndex(newIndex)}
                aria-label="Interactive playground carousel"
              >
                {imageSlides.map((slide) => (
                  <Box key={slide.id}>
                    <CardMedia
                      component="img"
                      image={slide.url}
                      alt={slide.alt}
                      sx={{
                        width: '100%',
                        height: 300,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 1,
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      {slide.caption}
                    </Typography>
                  </Box>
                ))}
              </Carousel>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Code Snippet */}
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Generated Code
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: 'grey.900',
                borderRadius: 1,
                overflow: 'auto',
              }}
            >
              <Typography
                component="pre"
                sx={{
                  m: 0,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  color: 'grey.100',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {codeSnippet}
              </Typography>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Switch,
  FormControlLabel,
  Paper,
  Stack,
} from '@mui/material';
import { Carousel } from '@mui/carousel';
import DemoSection from './components/DemoSection';
import InteractivePlayground from './components/InteractivePlayground';
import { imageSlides, testimonials } from './data/sampleData';

function App() {
  // State for feature toggles
  const [showNav, setShowNav] = React.useState(true);
  const [showIndicators, setShowIndicators] = React.useState(true);
  const [enableLoop, setEnableLoop] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(false);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            @mui/carousel Demo
          </Typography>
          <Chip label="v0.1.0" color="secondary" size="small" />
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom>
            Material UI Carousel
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
            A production-ready carousel with built-in navigation, swipe gestures, and accessibility
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
            <Chip label="Navigation" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            <Chip label="Swipe/Drag" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            <Chip label="Auto-play" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            <Chip label="Transitions" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            <Chip label="Accessible" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
          </Stack>
        </Container>
      </Box>

      {/* Interactive Playground */}
      <DemoSection
        title="Interactive Playground"
        description="Explore all carousel props in real-time. Adjust the controls to see how each prop affects the carousel behavior."
      >
        <InteractivePlayground />
      </DemoSection>

      <Divider />

      {/* Interactive Image Carousel Demo */}
      <DemoSection
        title="Image Carousel"
        description="Try the controls below to toggle features. You can also swipe/drag the carousel!"
      >
        <Box>
          {/* Feature Controls */}
          <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
            <Stack direction="row" spacing={3} flexWrap="wrap" justifyContent="center">
              <FormControlLabel
                control={<Switch checked={showNav} onChange={(e) => setShowNav(e.target.checked)} />}
                label="Navigation Arrows"
              />
              <FormControlLabel
                control={<Switch checked={showIndicators} onChange={(e) => setShowIndicators(e.target.checked)} />}
                label="Dot Indicators"
              />
              <FormControlLabel
                control={<Switch checked={enableLoop} onChange={(e) => setEnableLoop(e.target.checked)} />}
                label="Loop"
              />
              <FormControlLabel
                control={<Switch checked={autoPlay} onChange={(e) => setAutoPlay(e.target.checked)} />}
                label="Auto-play"
              />
            </Stack>
          </Paper>

          <Carousel
            hideNavigation={!showNav}
            hideIndicators={!showIndicators}
            enableLoop={enableLoop}
            autoPlay={autoPlay}
            autoPlayInterval={3000}
            aria-label="Image carousel"
          >
            {imageSlides.map((slide) => (
              <Box key={slide.id}>
                <CardMedia
                  component="img"
                  image={slide.url}
                  alt={slide.alt}
                  sx={{
                    width: '100%',
                    height: 400,
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    mt: 2,
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  {slide.caption}
                </Typography>
              </Box>
            ))}
          </Carousel>

          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
            💡 Tip: Try swiping left/right on touch devices, or click and drag with your mouse!
          </Typography>
        </Box>
      </DemoSection>

      <Divider />

      {/* Testimonials Carousel Demo */}
      <DemoSection
        title="Testimonials Carousel"
        description="Customer testimonials with elegant card-based design. Looping enabled for continuous browsing."
      >
        <Carousel
          enableLoop
          aria-label="Testimonials carousel"
        >
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              elevation={0}
              sx={{
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: 4,
                bgcolor: 'background.default',
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="blockquote"
                  sx={{
                    fontStyle: 'italic',
                    mb: 3,
                    color: 'text.primary',
                    '&::before': { content: '"\u201C"', color: 'primary.main', fontSize: '2rem', mr: 0.5 },
                    '&::after': { content: '"\u201D"', color: 'primary.main', fontSize: '2rem', ml: 0.5 },
                  }}
                >
                  {testimonial.quote}
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {testimonial.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.company}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </DemoSection>

      <Divider />

      {/* Auto-Play Carousel Demo */}
      <DemoSection
        title="Auto-Play Carousel"
        description="Automatically advances every 3 seconds. Pauses on hover or focus for accessibility."
      >
        <Box>
          <Carousel
            autoPlay
            autoPlayInterval={3000}
            enableLoop
            aria-label="Auto-play carousel"
          >
            {imageSlides.slice(0, 3).map((slide) => (
              <Box
                key={slide.id}
                sx={{
                  position: 'relative',
                  height: 400,
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  image={slide.url}
                  alt={slide.alt}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    p: 3,
                  }}
                >
                  <Typography variant="h4">{slide.caption}</Typography>
                </Box>
              </Box>
            ))}
          </Carousel>

          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            sx={{ mt: 2, color: 'text.secondary' }}
          >
            ⏸️ Hover over the carousel to pause auto-play
          </Typography>
        </Box>
      </DemoSection>

      <Divider />

      {/* Fade Transition Demo */}
      <DemoSection
        title="Fade Transition"
        description="Smooth crossfade effect between slides using the transition='fade' prop."
      >
        <Carousel
          transition="fade"
          enableLoop
          aria-label="Fade transition carousel"
        >
          {imageSlides.slice(0, 3).map((slide) => (
            <Box key={slide.id}>
              <CardMedia
                component="img"
                image={slide.url}
                alt={slide.alt}
                sx={{
                  width: '100%',
                  height: 350,
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
            </Box>
          ))}
        </Carousel>
      </DemoSection>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6, mt: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h6" gutterBottom>
            @mui/carousel
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            A native, production-ready Carousel component for Material UI
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 2, opacity: 0.6 }}>
            Part of the Material UI ecosystem
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;

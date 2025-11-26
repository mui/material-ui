import * as React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Stack,
  CardMedia,
} from '@mui/material';
import { Carousel } from '@mui/carousel';
import { imageSlides } from '../data/sampleData';

interface FeatureCardProps {
  title: string;
  description: string;
  tags: string[];
  children: React.ReactNode;
}

function FeatureCard({ title, description, tags, children }: FeatureCardProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
      <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mb: 2, gap: 0.5 }}>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} size="small" variant="outlined" />
        ))}
      </Stack>
      <Box sx={{ flexGrow: 1, minHeight: 200 }}>{children}</Box>
    </Paper>
  );
}

/**
 * FeatureShowcase component displays individual carousel features
 * with live demos and explanations.
 */
export default function FeatureShowcase() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Feature Showcase
      </Typography>

      <Grid container spacing={3}>
        {/* Touch/Swipe Gestures */}
        <Grid item xs={12} md={6}>
          <FeatureCard
            title="Touch & Swipe Gestures"
            description="Natural swipe navigation on touch devices. Drag with mouse on desktop. Velocity-based gesture recognition for smooth interactions."
            tags={['Touch', 'Mouse', 'Drag']}
          >
            <Box sx={{ position: 'relative' }}>
              <Carousel aria-label="Swipe demo carousel">
                {imageSlides.slice(0, 3).map((slide) => (
                  <CardMedia
                    key={slide.id}
                    component="img"
                    image={slide.url}
                    alt={slide.alt}
                    sx={{ height: 180, borderRadius: 1, objectFit: 'cover' }}
                  />
                ))}
              </Carousel>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mt: 1,
                  color: 'text.secondary',
                }}
              >
                Swipe or drag to navigate
              </Typography>
            </Box>
          </FeatureCard>
        </Grid>

        {/* Auto-Play */}
        <Grid item xs={12} md={6}>
          <FeatureCard
            title="Auto-Play"
            description="Automatically advances slides at configurable intervals. Pauses on hover and focus for accessibility. Respects prefers-reduced-motion."
            tags={['Auto-play', 'Pause on hover', 'Accessibility']}
          >
            <Box sx={{ position: 'relative' }}>
              <Carousel
                autoPlay
                autoPlayInterval={2500}
                enableLoop
                aria-label="Auto-play demo carousel"
              >
                {imageSlides.slice(0, 3).map((slide) => (
                  <CardMedia
                    key={slide.id}
                    component="img"
                    image={slide.url}
                    alt={slide.alt}
                    sx={{ height: 180, borderRadius: 1, objectFit: 'cover' }}
                  />
                ))}
              </Carousel>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mt: 1,
                  color: 'text.secondary',
                }}
              >
                Hover to pause auto-play
              </Typography>
            </Box>
          </FeatureCard>
        </Grid>

        {/* Slide Transition */}
        <Grid item xs={12} md={6}>
          <FeatureCard
            title="Slide Transition"
            description="Classic horizontal slide animation with configurable duration. GPU-accelerated transforms for smooth 60fps performance."
            tags={['Slide', 'Animation', '60fps']}
          >
            <Carousel
              transition="slide"
              transitionDuration={450}
              enableLoop
              aria-label="Slide transition demo carousel"
            >
              {imageSlides.slice(0, 3).map((slide) => (
                <CardMedia
                  key={slide.id}
                  component="img"
                  image={slide.url}
                  alt={slide.alt}
                  sx={{ height: 180, borderRadius: 1, objectFit: 'cover' }}
                />
              ))}
            </Carousel>
          </FeatureCard>
        </Grid>

        {/* Fade Transition */}
        <Grid item xs={12} md={6}>
          <FeatureCard
            title="Fade Transition"
            description="Smooth crossfade between slides using React Transition Group. Perfect for image galleries and hero sections."
            tags={['Fade', 'Crossfade', 'React Transition Group']}
          >
            <Carousel
              transition="fade"
              transitionDuration={600}
              enableLoop
              aria-label="Fade transition demo carousel"
            >
              {imageSlides.slice(0, 3).map((slide) => (
                <CardMedia
                  key={slide.id}
                  component="img"
                  image={slide.url}
                  alt={slide.alt}
                  sx={{ height: 180, borderRadius: 1, objectFit: 'cover' }}
                />
              ))}
            </Carousel>
          </FeatureCard>
        </Grid>

        {/* Loop Mode */}
        <Grid item xs={12} md={6}>
          <FeatureCard
            title="Loop Mode"
            description="Infinite navigation that wraps from last slide to first and vice versa. Perfect for continuous browsing experiences."
            tags={['Loop', 'Infinite', 'Wrap']}
          >
            <Box>
              <Carousel enableLoop aria-label="Loop mode demo carousel">
                {imageSlides.slice(0, 4).map((slide) => (
                  <CardMedia
                    key={slide.id}
                    component="img"
                    image={slide.url}
                    alt={slide.alt}
                    sx={{ height: 180, borderRadius: 1, objectFit: 'cover' }}
                  />
                ))}
              </Carousel>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mt: 1,
                  color: 'text.secondary',
                }}
              >
                Navigate past the last slide to wrap around
              </Typography>
            </Box>
          </FeatureCard>
        </Grid>

        {/* Custom Navigation */}
        <Grid item xs={12} md={6}>
          <FeatureCard
            title="Navigation Controls"
            description="Built-in navigation arrows and dot indicators. Easily show, hide, or customize navigation elements."
            tags={['Arrows', 'Dots', 'Customizable']}
          >
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary" gutterBottom>
                  With navigation:
                </Typography>
                <Carousel aria-label="Navigation demo carousel">
                  {imageSlides.slice(0, 3).map((slide) => (
                    <CardMedia
                      key={slide.id}
                      component="img"
                      image={slide.url}
                      alt={slide.alt}
                      sx={{ height: 100, borderRadius: 1, objectFit: 'cover' }}
                    />
                  ))}
                </Carousel>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" gutterBottom>
                  Without navigation:
                </Typography>
                <Carousel
                  hideNavigation
                  hideIndicators
                  aria-label="No navigation demo carousel"
                >
                  {imageSlides.slice(0, 3).map((slide) => (
                    <CardMedia
                      key={slide.id}
                      component="img"
                      image={slide.url}
                      alt={slide.alt}
                      sx={{ height: 100, borderRadius: 1, objectFit: 'cover' }}
                    />
                  ))}
                </Carousel>
              </Box>
            </Stack>
          </FeatureCard>
        </Grid>
      </Grid>
    </Box>
  );
}

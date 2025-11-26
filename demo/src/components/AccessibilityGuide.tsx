import * as React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  AlertTitle,
  Stack,
  CardMedia,
} from '@mui/material';
import { Carousel } from '@mui/carousel';
import { imageSlides } from '../data/sampleData';

interface KeyboardShortcut {
  keys: string[];
  action: string;
  description: string;
}

const keyboardShortcuts: KeyboardShortcut[] = [
  {
    keys: ['Arrow Left', 'Arrow Up'],
    action: 'Previous slide',
    description: 'Navigate to the previous slide (RTL-aware)',
  },
  {
    keys: ['Arrow Right', 'Arrow Down'],
    action: 'Next slide',
    description: 'Navigate to the next slide (RTL-aware)',
  },
  {
    keys: ['Home'],
    action: 'First slide',
    description: 'Jump to the first slide',
  },
  {
    keys: ['End'],
    action: 'Last slide',
    description: 'Jump to the last slide',
  },
  {
    keys: ['Escape'],
    action: 'Pause auto-play',
    description: 'Stop automatic slide advancement',
  },
  {
    keys: ['1-9'],
    action: 'Direct navigation',
    description: 'Jump directly to slide 1-9',
  },
  {
    keys: ['Tab'],
    action: 'Focus navigation',
    description: 'Move focus through interactive elements',
  },
];

interface AriaFeature {
  attribute: string;
  value: string;
  purpose: string;
}

const ariaFeatures: AriaFeature[] = [
  {
    attribute: 'role',
    value: '"region"',
    purpose: 'Identifies the carousel as a landmark region',
  },
  {
    attribute: 'aria-roledescription',
    value: '"carousel"',
    purpose: 'Describes the region type to screen readers',
  },
  {
    attribute: 'aria-label',
    value: 'Custom label',
    purpose: 'Provides accessible name for the carousel',
  },
  {
    attribute: 'aria-live',
    value: '"polite" / "off"',
    purpose: 'Announces slide changes (off during auto-play)',
  },
  {
    attribute: 'aria-hidden',
    value: '"true" / "false"',
    purpose: 'Hides inactive slides from screen readers',
  },
  {
    attribute: 'role="tablist"',
    value: 'On indicators',
    purpose: 'Indicates indicators are a tab list',
  },
  {
    attribute: 'role="tab"',
    value: 'On each indicator',
    purpose: 'Each indicator acts as a tab',
  },
  {
    attribute: 'aria-selected',
    value: '"true" / "false"',
    purpose: 'Indicates which indicator/slide is active',
  },
];

/**
 * AccessibilityGuide component demonstrates the carousel's accessibility features
 * including keyboard navigation, ARIA attributes, and screen reader support.
 */
export default function AccessibilityGuide() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Accessibility Guide
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        <AlertTitle>WCAG 2.1 Compliant</AlertTitle>
        The @mui/carousel component is designed to meet WCAG 2.1 Level AA accessibility
        standards. It provides full keyboard navigation, screen reader support, and
        respects user motion preferences.
      </Alert>

      <Grid container spacing={4}>
        {/* Keyboard Navigation Section */}
        <Grid item xs={12} lg={6}>
          <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Keyboard Navigation
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Full keyboard support allows users to navigate the carousel without a mouse.
              Click the carousel below and try the keyboard shortcuts.
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Carousel enableLoop aria-label="Keyboard navigation demo">
                {imageSlides.slice(0, 4).map((slide) => (
                  <CardMedia
                    key={slide.id}
                    component="img"
                    image={slide.url}
                    alt={slide.alt}
                    sx={{ height: 150, borderRadius: 1, objectFit: 'cover' }}
                  />
                ))}
              </Carousel>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mt: 1,
                  color: 'primary.main',
                  fontWeight: 'medium',
                }}
              >
                Click here first, then use arrow keys to navigate
              </Typography>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Keys</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {keyboardShortcuts.map((shortcut) => (
                    <TableRow key={shortcut.action}>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {shortcut.keys.map((key) => (
                            <Chip
                              key={key}
                              label={key}
                              size="small"
                              variant="outlined"
                              sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                            />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{shortcut.action}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {shortcut.description}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* ARIA Attributes Section */}
        <Grid item xs={12} lg={6}>
          <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              ARIA Attributes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The carousel uses semantic ARIA attributes to provide context and state
              information to assistive technologies.
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Attribute</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Purpose</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ariaFeatures.map((feature) => (
                    <TableRow key={feature.attribute}>
                      <TableCell>
                        <Chip
                          label={feature.attribute}
                          size="small"
                          sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: 'monospace' }}
                        >
                          {feature.value}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">{feature.purpose}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Screen Reader Support */}
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Screen Reader Support
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The carousel provides meaningful announcements to screen reader users:
            </Typography>

            <Stack spacing={1}>
              <Alert severity="success" variant="outlined">
                <Typography variant="body2">
                  <strong>Slide announcements:</strong> "Slide 2 of 5"
                </Typography>
              </Alert>
              <Alert severity="success" variant="outlined">
                <Typography variant="body2">
                  <strong>Navigation hints:</strong> "Use arrow keys to navigate"
                </Typography>
              </Alert>
              <Alert severity="success" variant="outlined">
                <Typography variant="body2">
                  <strong>Auto-play status:</strong> aria-live is set to "off" during
                  auto-play to prevent excessive announcements
                </Typography>
              </Alert>
              <Alert severity="success" variant="outlined">
                <Typography variant="body2">
                  <strong>Indicator navigation:</strong> Indicators use roving tabindex
                  for efficient keyboard navigation
                </Typography>
              </Alert>
            </Stack>
          </Paper>
        </Grid>

        {/* Motion Preferences */}
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Motion Preferences
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The carousel respects the user's motion preferences for a comfortable
              experience:
            </Typography>

            <Stack spacing={2}>
              <Alert severity="info" variant="outlined">
                <AlertTitle>prefers-reduced-motion</AlertTitle>
                <Typography variant="body2">
                  When users have reduced motion enabled in their OS settings, the
                  carousel respects this preference by reducing or eliminating
                  animations.
                </Typography>
              </Alert>

              <Alert severity="info" variant="outlined">
                <AlertTitle>Auto-play Pausing</AlertTitle>
                <Typography variant="body2">
                  Auto-play automatically pauses when:
                </Typography>
                <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
                  <li>Mouse hovers over the carousel</li>
                  <li>Keyboard focus enters the carousel</li>
                  <li>User presses Escape key</li>
                </ul>
              </Alert>

              <Alert severity="info" variant="outlined">
                <AlertTitle>Focus Indicators</AlertTitle>
                <Typography variant="body2">
                  Clear focus indicators are visible when navigating with keyboard,
                  following WCAG 2.1 Focus Visible requirements.
                </Typography>
              </Alert>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

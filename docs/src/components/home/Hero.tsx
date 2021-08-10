import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GradientText from 'docs/src/components/typography/GradientText';
import PlayerCard from 'docs/src/pages/components/cards/PlayerCard';
import TaskCard from 'docs/src/pages/components/cards/TaskCard';
import NotificationCard from 'docs/src/pages/components/cards/NotificationCard';
import ThemeChip from 'docs/src/pages/components/chips/ThemeChip';
import ThemeDatePicker from 'docs/src/pages/components/date-picker/ThemeDatePicker';
import ThemeSlider from 'docs/src/pages/components/slider/ThemeSlider';
import FolderTable from 'docs/src/pages/components/tables/FolderTable';
import ThemeTabs from 'docs/src/pages/components/tabs/ThemeTabs';
import ThemeTimeline from 'docs/src/pages/components/timeline/ThemeTimeline';
import ViewToggleButton from 'docs/src/pages/components/toggle-button/ViewToggleButton';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';

const MAX_WIDTH = 1000;
const SPAN_SIZE = 10;
const GAP = 0;
const GUTTER = 30;
const grid = [
  {
    ui: <TaskCard />,
    width: 330,
    height: 280,
    sx: {
      '& > .MuiCard-root': {
        height: '100%',
        width: '100%',
        maxWidth: '100%',
      },
    },
  },
  {
    ui: <ThemeDatePicker />,
    width: 320,
    height: 380,
  },
  {
    width: MAX_WIDTH - (320 + GUTTER) - (320 + GUTTER),
    height: 388,
  },
  {
    ui: <ThemeSlider />,
    width: 70,
    height: 180,
  },
  {
    ui: <ViewToggleButton />,
    width: 180,
    height: 70,
    sx: { alignSelf: 'flex-end' },
  },
  {
    width: MAX_WIDTH - (320 + GUTTER) - (320 + GUTTER),
    height: 135,
  },
  {
    ui: <ThemeChip />,
    width: 220,
    height: 32,
    sx: { alignSelf: 'center' },
  },
  {
    ui: <PlayerCard />,
    width: 313,
    height: 119,
  },
  {
    ui: (
      <Box sx={{ transform: { xs: 'scale(1.11)', lg: 'scale(1)' } }}>
        <ThemeTabs />
      </Box>
    ),
    width: 310,
    height: 50,
  },
  {
    ui: <NotificationCard />,
    width: 379,
    height: 100,
  },
  {
    ui: <FolderTable />,
    width: 260,
    height: 188,
  },
  {
    ui: <ThemeTimeline />,
    width: 270,
    height: 160,
  },
];

function getSpan(value: number) {
  // x * SPAN_SIZE + (x - 1) * GAP = width
  // x * (SPAN_SIZE + GAP) = width + GAP
  return Math.ceil((value + GAP) / (SPAN_SIZE + GAP));
}

export default function Hero() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Container
        sx={{
          minHeight: 500,
          height: 'calc(100vh - 120px)',
          maxHeight: { xs: 500, sm: 700, xl: 1000 },
          transition: '0.3s',
        }}
      >
        <Grid
          container
          alignItems="center"
          wrap="nowrap"
          sx={{ height: '100%', maxWidth: { xs: 500, md: 'initial' }, mx: 'auto' }}
        >
          <Grid item md={7} lg={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: 500 }}>
              <Typography variant="h1" sx={{ my: 2 }}>
                The <GradientText>ultimate</GradientText> solution for your UI.
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                MUI provides a robust, customizible and accessible library of foundational and
                advanced components, enabling you to build your own design system and develop React
                applications faster.
              </Typography>
              <GetStartedButtons sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }} />
            </Box>
          </Grid>
          <Grid
            item
            md={5}
            lg={6}
            sx={{ maxHeight: '100%', display: { xs: 'none', md: 'initial' } }}
          >
            <Box
              aria-hidden="true"
              sx={{
                p: 3,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50'),
                minWidth: 2000,
                minHeight: 500,
                height: 'calc(100vh - 120px)',
                maxHeight: { lg: 700, xl: 1000 },
                borderBottomLeftRadius: 10,
                transition: 'max-height 0.3s',
              }}
            >
              <Box
                sx={{
                  maxWidth: MAX_WIDTH,
                  display: 'grid',
                  gridTemplateColumns: `repeat(auto-fit, minmax(${SPAN_SIZE}px, 1fr))`,
                  gridAutoRows: SPAN_SIZE,
                  gridAutoFlow: 'dense',
                  '& > *': {
                    opacity: 0.6,
                    transition: '0.4s',
                    '&:hover': {
                      opacity: 1,
                    },
                  },
                  '& *': {
                    fontFamily: [
                      '"IBM Plex Sans"',
                      '-apple-system',
                      'BlinkMacSystemFont',
                      'sans-serif',
                    ].join(','),
                  },
                  transform: { xs: 'scale(0.9)', xl: 'scale(1)' },
                  transformOrigin: 'top left',
                  transition: 'transform 0.3s',
                }}
              >
                {grid.map((config, index) => (
                  <Box
                    key={index}
                    sx={{
                      gridRow: `span ${getSpan(config.height + (config.ui ? GUTTER : -GUTTER))}`,
                      gridColumn: `span ${getSpan(config.width + (config.ui ? GUTTER : -GUTTER))}`,
                      p: 1.5,
                      ...config.sx,
                    }}
                  >
                    {config.ui || null}
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

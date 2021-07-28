import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import ContentCopyRounded from '@material-ui/icons/ContentCopyRounded';
import GradientText from 'docs/src/components/GradientText';
import PlayerCard from 'docs/src/pages/components/cards/PlayerCard';
import TaskCard from 'docs/src/pages/components/cards/TaskCard';
import NotificationCard from 'docs/src/pages/components/cards/NotificationCard';
import CustomizedChip from 'docs/src/pages/components/chips/CustomizedChip';
import ThemeDatePicker from 'docs/src/pages/components/date-picker/ThemeDatePicker';
import ThemeSlider from 'docs/src/pages/components/slider/ThemeSlider';
import FolderTable from 'docs/src/pages/components/tables/FolderTable';
import ThemeTabs from 'docs/src/pages/components/tabs/ThemeTabs';
import ThemeTimeline from 'docs/src/pages/components/timeline/ThemeTimeline';
import ViewToggleButton from 'docs/src/pages/components/toggle-button/ViewToggleButton';

export default function Hero() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Container
        sx={{
          minHeight: 500,
          height: 'calc(100vh - 120px)',
          maxHeight: { xs: 500, sm: 700, xl: 1000 },
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
                advanced components, enabling you to build your own design system and develop faster
                React applications.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  '&& > *': { minWidth: 'clamp(0px, (449px - 100%) * 999 ,100%)' },
                }}
              >
                <Button size="large" variant="contained" endIcon={<KeyboardArrowRightRounded />}>
                  Get Started
                </Button>
                <Box sx={{ width: 16, height: 16 }} />
                <Button
                  size="large"
                  // @ts-expect-error
                  variant="code"
                  startIcon="$"
                  endIcon={<ContentCopyRounded />}
                >
                  npm install @mui/core
                </Button>
              </Box>
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
                bgcolor: 'grey.50',
                minWidth: 2000,
                minHeight: 500,
                height: 'calc(100vh - 120px)',
                maxHeight: { lg: 700, xl: 1000 },
                borderBottomLeftRadius: 10,
              }}
            >
              <Box
                sx={{
                  maxWidth: 1000,
                  py: 3,
                  px: 5,
                  display: 'grid',
                  gap: 3,
                  gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
                  gridAutoRows: '60px',
                  gridAutoFlow: 'dense',
                  alignTracks: 'center',
                  '& > *': {
                    justifySelf: 'center',
                    alignSelf: 'center',
                    opacity: 0.6,
                    transition: '0.4s',
                    '&:hover': {
                      opacity: 1,
                    },
                  },
                  '& *': {
                    fontFamily: [
                      '"PlusJakartaSans"',
                      '-apple-system',
                      'BlinkMacSystemFont',
                      'sans-serif',
                    ].join(','),
                  },
                }}
              >
                <Box sx={{ gridRow: 'span 4', gridColumn: 'span 4' }}>
                  <TaskCard />
                </Box>
                <Box
                  sx={{
                    gridRow: 'span 3',
                    gridColumn: 'span 1',
                    ml: -2,
                    py: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 5,
                  }}
                >
                  <ThemeSlider />
                </Box>
                <Box sx={{ gridRow: 'span 3', gridColumn: 'span 3' }}>
                  <FolderTable />
                </Box>
                <Box sx={{ gridRow: 'span 4', gridColumn: 'span 1' }} />
                <Box sx={{ gridColumn: 'span 3' }}>
                  <ViewToggleButton />
                </Box>
                <Box sx={{ gridRow: 'span 1', gridColumn: 'span 4' }}>
                  <ThemeTabs />
                </Box>
                <Box sx={{ gridRow: 'span 3', gridColumn: 'span 3' }}>
                  <ThemeTimeline />
                </Box>
                <Box sx={{ gridRow: 'span 3', gridColumn: 'span 3' }} />
                <Box sx={{ gridRow: 'span 2', gridColumn: 'span 4' }}>
                  <PlayerCard />
                </Box>
                <Box sx={{ gridRow: 'span 1', gridColumn: 'span 4' }}>
                  <CustomizedChip />
                </Box>
                <Box
                  sx={{
                    gridRow: 'span 5',
                    gridColumn: 'span 4',
                    '&&': { justifySelf: 'flex-start', alignSelf: 'flex-start' },
                  }}
                >
                  <ThemeDatePicker />
                </Box>
                <Box
                  sx={{
                    gridRow: 'span 2',
                    gridColumn: 'span 4',
                    '&&': { alignSelf: 'flex-start' },
                  }}
                >
                  <NotificationCard />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

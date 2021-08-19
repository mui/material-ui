import * as React from 'react';
import dynamic from 'next/dynamic';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Stack from '@material-ui/core/Stack';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';

const PlayerCard = dynamic(() => import('../showcase/PlayerCard'), { ssr: false });
const TaskCard = dynamic(() => import('../showcase/TaskCard'), { ssr: false });
const NotificationCard = dynamic(() => import('../showcase/NotificationCard'), { ssr: false });
const ThemeChip = dynamic(() => import('../showcase/ThemeChip'), { ssr: false });
const ThemeDatePicker = dynamic(() => import('../showcase/ThemeDatePicker'), { ssr: false });
const ThemeSlider = dynamic(() => import('../showcase/ThemeSlider'), { ssr: false });
const FolderTable = dynamic(() => import('../showcase/FolderTable'), { ssr: false });
const ThemeTabs = dynamic(() => import('../showcase/ThemeTabs'), { ssr: false });
const ThemeTimeline = dynamic(() => import('../showcase/ThemeTimeline'), { ssr: false });
const ViewToggleButton = dynamic(() => import('../showcase/ViewToggleButton'), { ssr: false });
const ThemeToggleButton = dynamic(() => import('../showcase/ThemeToggleButton'), { ssr: false });
const ThemeSwitch = dynamic(() => import('../showcase/ThemeSwitch'), { ssr: false });
const ThemeAccordion = dynamic(() => import('../showcase/ThemeAccordion'), { ssr: false });

export default function Hero() {
  const frame = React.useRef<null | HTMLDivElement>(null);
  React.useEffect(() => {
    if (frame.current) {
      const elements = frame.current.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
      );
      elements.forEach((elm) => {
        elm.setAttribute('tabindex', '-1');
      });
    }
  }, []);
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
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
                The <GradientText>ultimate</GradientText> solution for your UI
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
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
              ref={frame}
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
                '& > div': {
                  width: 360,
                  display: 'inline-flex',
                  verticalAlign: 'top',
                  '&:nth-of-type(2)': {
                    width: { xl: 400 },
                  },
                },
                '&& *': {
                  fontFamily: [
                    '"IBM Plex Sans"',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'sans-serif',
                  ].join(','),
                },
              }}
            >
              <Stack spacing={4} sx={{ '& > .MuiPaper-root': { maxWidth: 'none' } }}>
                <TaskCard />
                <PlayerCard />
                <ThemeToggleButton />
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <ThemeSwitch />
                  <Box sx={{ width: 40 }} />
                  <ThemeChip />
                </Box>
                <ThemeTimeline />
                <FolderTable />
              </Stack>
              <Stack spacing={4} sx={{ ml: 4, '& > .MuiPaper-root': { maxWidth: 'none' } }}>
                <ThemeDatePicker />
                <ThemeTabs />
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <ThemeSlider />
                  </Box>
                  <Stack spacing={2} sx={{ ml: 4 }}>
                    <ViewToggleButton />
                    <Button size="medium" variant="contained" sx={{ flexGrow: 1 }}>
                      Buy Library
                    </Button>
                    <Button size="medium" variant="contained" disabled sx={{ flexGrow: 1 }}>
                      Buy Library
                    </Button>
                  </Stack>
                </Box>
                <ThemeAccordion />
                <NotificationCard />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

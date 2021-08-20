import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import dynamic from 'next/dynamic';
import Box, { BoxProps } from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Stack from '@material-ui/core/Stack';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';

function createLoading(sx: BoxProps['sx']) {
  return () => (
    <Box
      sx={{
        borderRadius: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : 'grey.100'),
        ...sx,
      }}
    />
  );
}

const TaskCard = dynamic(() => import('../showcase/TaskCard'), {
  ssr: false,
  loading: createLoading({ width: 360, height: 280 }),
});
const PlayerCard = dynamic(() => import('../showcase/PlayerCard'), {
  ssr: false,
  loading: createLoading({ width: 360, height: 146 }),
});
const ThemeToggleButton = dynamic(() => import('../showcase/ThemeToggleButton'), {
  ssr: false,
  loading: createLoading({ width: 360, height: 48 }),
});
const ThemeSwitch = dynamic(() => import('../showcase/ThemeSwitch'), {
  ssr: false,
  loading: createLoading({ width: 108, height: 20 }),
});
const ThemeChip = dynamic(() => import('../showcase/ThemeChip'), {
  ssr: false,
  loading: createLoading({ width: 212, height: 32 }),
});
const ThemeTimeline = dynamic(() => import('../showcase/ThemeTimeline'), {
  ssr: false,
  loading: createLoading({ width: 360, height: 180 }),
});
const FolderTable = dynamic(() => import('../showcase/FolderTable'), {
  ssr: false,
  loading: createLoading({ width: 360, height: 212 }),
});

const ThemeDatePicker = dynamic(() => import('../showcase/ThemeDatePicker'), {
  ssr: false,
  loading: createLoading({ width: { md: 360, xl: 400 }, height: 260 }),
});
const ThemeTabs = dynamic(() => import('../showcase/ThemeTabs'), {
  ssr: false,
  loading: createLoading({ width: { md: 360, xl: 400 }, height: 48 }),
});
const ThemeSlider = dynamic(() => import('../showcase/ThemeSlider'), {
  ssr: false,
  loading: createLoading({ width: { md: 124, xl: 164 }, height: 214 }),
});
const ViewToggleButton = dynamic(() => import('../showcase/ViewToggleButton'), {
  ssr: false,
  loading: createLoading({ width: 196, height: 40 }),
});
const ThemeButton = dynamic(() => import('../showcase/ThemeButton'), {
  ssr: false,
  loading: createLoading({ width: 196, height: 154 }),
});
const ThemeAccordion = dynamic(() => import('../showcase/ThemeAccordion'), {
  ssr: false,
  loading: createLoading({ width: { md: 360, xl: 400 }, height: 171 }),
});
const NotificationCard = dynamic(() => import('../showcase/NotificationCard'), {
  ssr: false,
  loading: createLoading({ width: { md: 360, xl: 400 }, height: 146 }),
});

export default function Hero() {
  const frame = React.useRef<null | HTMLDivElement>(null);
  const globalTheme = useTheme();
  const isMdUp = useMediaQuery(globalTheme.breakpoints.up('md'));
  React.useEffect(() => {
    if (frame.current && isMdUp) {
      const elements = frame.current.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
      );
      elements.forEach((elm) => {
        elm.setAttribute('tabindex', '-1');
      });
    }
  }, [isMdUp]);
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Container
        sx={{
          minHeight: 500,
          height: 'calc(100vh - 64px)',
          transition: '0.3s',
        }}
      >
        <Grid
          container
          wrap="nowrap"
          sx={{ height: '100%', maxWidth: { xs: 500, md: 'initial' }, mx: 'auto' }}
        >
          <Grid item md={7} lg={6} sx={{ alignSelf: 'center' }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 8 } }}>
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
                overflow: 'hidden',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50'),
                minWidth: 2000,
                minHeight: 500,
                height: 'calc(100vh - 64px)',
                maxHeight: { md: 'calc(100vh - 120px)', xl: 'calc(100vh - 168px)' },
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
              {isMdUp && (
                <Stack spacing={4} sx={{ '& > .MuiPaper-root': { maxWidth: 'none' } }}>
                  <TaskCard />
                  <PlayerCard />
                  <ThemeToggleButton />
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
                  >
                    <ThemeSwitch />
                    <Box sx={{ width: 40 }} />
                    <ThemeChip />
                  </Box>
                  <ThemeTimeline />
                  <FolderTable />
                </Stack>
              )}
              {isMdUp && (
                <Stack spacing={4} sx={{ ml: 4, '& > .MuiPaper-root': { maxWidth: 'none' } }}>
                  <ThemeDatePicker />
                  <ThemeTabs />
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <ThemeSlider />
                    </Box>
                    <Stack spacing={2} sx={{ ml: 4 }}>
                      <ViewToggleButton />
                      <ThemeButton />
                    </Stack>
                  </Box>
                  <ThemeAccordion />
                  <NotificationCard />
                </Stack>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

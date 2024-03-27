import * as React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';

function createLoading(sx: BoxProps['sx']) {
  return function Loading() {
    return (
      <Box
        sx={[
          (theme) => ({
            borderRadius: 1,
            bgcolor: 'grey.100',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.800',
            }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    );
  };
}

const TaskCard = dynamic(() => import('../showcase/TaskCard'), {
  ssr: false,
  loading: createLoading({ width: 360, height: 280 }),
});
const PlayerCard = dynamic(() => import('../showcase/PlayerCard'), {
  ssr: false,
  loading: createLoading({ width: 400, height: 134 }),
});
const ThemeToggleButton = dynamic(() => import('../showcase/ThemeToggleButton'), {
  ssr: false,
  loading: createLoading({ width: 360, height: 48 }),
});
const ThemeChip = dynamic(() => import('../showcase/ThemeChip'), {
  ssr: false,
  loading: createLoading({ width: 360, height: 24 }),
});
const ThemeTimeline = dynamic(() => import('../showcase/ThemeTimeline'), {
  ssr: false,
  loading: createLoading({ width: 400, height: 175 }),
});
const FolderTable = dynamic(() => import('../showcase/FolderTable'), {
  ssr: false,
  loading: createLoading({ width: 400, height: 294 }),
});
const ThemeDatePicker = dynamic(() => import('../showcase/ThemeDatePicker'), {
  ssr: false,
  loading: createLoading({ width: 360, height: 245 }),
});
const ThemeTabs = dynamic(() => import('../showcase/ThemeTabs'), {
  ssr: false,
  loading: createLoading({ width: { md: 360, xl: 400 }, height: 48 }),
});
const ThemeSlider = dynamic(() => import('../showcase/ThemeSlider'), {
  ssr: false,
  loading: createLoading({ width: 400, height: 104 }),
});
const ThemeAccordion = dynamic(() => import('../showcase/ThemeAccordion'), {
  ssr: false,
  loading: createLoading({ width: 360, height: 252 }),
});
const NotificationCard = dynamic(() => import('../showcase/NotificationCard'), {
  ssr: false,
  loading: createLoading({ width: 360, height: 98 }),
});

export default function Hero() {
  const globalTheme = useTheme();
  const isMdUp = useMediaQuery(globalTheme.breakpoints.up('md'));
  return (
    <HeroContainer
      linearGradient
      left={
        <React.Fragment>
          <SectionHeadline
            title={
              <Typography variant="h1">
                A comprehensive <GradientText>ecosystem</GradientText> of React UI libraries
                {/* A comprehensive ecosystem of React UI tools // iteration 2 */}
                {/* A design system ecosystem of React UI tools // iteration 1 */}
                {/* Move faster with intuitive React UI tools // current version*/}
              </Typography>
            }
            description="MUI offers an extensive suite of free UI libraries to help you ship new features and products faster. Quickly start with styled, production-ready Material UI components or explore our other products for alternative use cases."
          />
          <GetStartedButtons
            primaryLabel="View all products"
            primaryUrl="/blog/mui-product-comparison/"
            secondaryLabel="Start with Material UI"
            secondaryUrl="/material-ui/getting-started/"
          />
        </React.Fragment>
      }
      rightSx={{
        p: 4,
        ml: 2,
        minWidth: 2000,
        overflow: 'hidden', // the components in the Hero section are mostly illustrative, even though they're interactive. That's why scrolling is disabled.
        '& > div': {
          width: 360,
          display: 'inline-flex',
          verticalAlign: 'top',
          '&:nth-of-type(2)': {
            width: { xl: 400 },
          },
        },
        '&& *': {
          fontFamily: ['"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(
            ',',
          ),
        },
      }}
      right={
        <React.Fragment>
          {isMdUp && (
            <Stack spacing={3} useFlexGap sx={{ '& > .MuiPaper-root': { maxWidth: 'none' } }}>
              <TaskCard />
              <ThemeChip />
              <ThemeDatePicker />
              <NotificationCard />
              <ThemeAccordion />
            </Stack>
          )}
          {isMdUp && (
            <Stack
              spacing={3}
              useFlexGap
              sx={{ ml: 3, '& > .MuiPaper-root': { maxWidth: 'none' } }}
            >
              <ThemeTimeline />
              <ThemeToggleButton />
              <ThemeSlider />
              <ThemeTabs />
              <PlayerCard />
              <FolderTable />
            </Stack>
          )}
        </React.Fragment>
      }
    />
  );
}

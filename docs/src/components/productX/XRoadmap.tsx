import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import SvgTable from 'docs/src/icons/SvgTable';
import SvgDatePicker from 'docs/src/icons/SvgDatePicker';
import SvgTreeView from 'docs/src/icons/SvgTreeView';
import SvgSparkline from 'docs/src/icons/SvgSparkline';
import SvgCharts from 'docs/src/icons/SvgCharts';
import SvgGuage from 'docs/src/icons/SvgGuage';
import SvgUpload from 'docs/src/icons/SvgUpload';
import SvgScheduler from 'docs/src/icons/SvgScheduler';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';

const darkDesignTokens = getDesignTokens('dark');
let darkTheme = createTheme(darkDesignTokens);
darkTheme = createTheme(darkTheme, getThemedComponents(darkTheme));
// @ts-ignore
darkTheme.components.MuiPaper.styleOverrides.outlined.backgroundColor =
  darkTheme.palette.primaryDark[600];

export default function CoreHeroEnd() {
  function renderList(content: React.ReactElement) {
    return (
      <Box
        sx={{
          mt: 2,
          display: 'grid',
          alignItems: 'center',
          gap: 2,
          gridTemplateColumns: 'max-content 1fr',
        }}
      >
        {content}
      </Box>
    );
  }
  const bullet = (
    <Box
      sx={{
        ml: 1,
        mr: -2,
        display: 'flex',
        alignItems: 'center',
        '&:before': {
          content: '""',
          display: 'block',
          height: 2,
          width: 20,
          bgcolor: 'primaryDark.400',
        },
        '&:after': {
          content: '""',
          width: 6,
          height: 6,
          bgcolor: 'warning.500',
          borderRadius: '50%',
          display: 'block',
        },
      }}
    />
  );
  return (
    <Section bg="dim">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box maxWidth={500}>
              <SectionHeadline
                mode="dark"
                overline="Roadmap"
                title="Follow the lab for future updates"
                description="We're just starting with the advanced components. There's a lot more to come in the near future!"
              />
              <Button
                component={Link}
                href={ROUTES.roadmap}
                noLinkStyle
                size="large"
                variant="contained"
                endIcon={<KeyboardArrowRightRounded />}
              >
                See the roadmap
              </Button>
            </Box>
          </Grid>
          <ThemeProvider theme={darkTheme}>
            <Grid item xs={12} md={6} sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  display: 'grid',
                  overflow: { xs: 'auto', lg: 'unset' },
                  gap: 2,
                  alignItems: 'flex-start',
                  gridTemplateColumns: 'repeat(3, minmax(200px, 1fr))',
                  typography: 'body2',
                  '& .MuiPaper-root': {
                    p: 2,
                  },
                }}
              >
                <Paper variant="outlined">
                  <Box sx={{ fontWeight: 'bold' }}>In the lab:</Box>
                  <Box>Almost ready to go.</Box>
                  {renderList(
                    <React.Fragment>
                      <SvgTable id="table-lab" active />
                      <b>Data Grid</b>
                      <SvgDatePicker id="date-picker-lab" active />
                      <b>Date Picker</b>
                      <SvgTreeView active />
                      <b>Tree View</b>
                    </React.Fragment>,
                  )}
                </Paper>
                <Paper variant="outlined">
                  <Box sx={{ fontWeight: 'bold' }}>Working in progress</Box>
                  <Box>Getting there.</Box>
                  {renderList(
                    <React.Fragment>
                      <Box
                        sx={{
                          lineHeight: 0,
                          position: 'relative',
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            height: 114,
                            width: 2,
                            bgcolor: 'primaryDark.400',
                            bottom: 0,
                            transform: 'translate(10px, 100%)',
                          },
                        }}
                      >
                        <SvgTable id="table-wip" active />
                      </Box>
                      <b>Data Grid</b>
                      {bullet}
                      <b>Tree data</b>
                      {bullet}
                      <b>Grouping</b>
                      {bullet}
                      <b>Column pinning</b>
                    </React.Fragment>,
                  )}
                </Paper>
                <Paper variant="outlined">
                  <Box sx={{ fontWeight: 'bold' }}>On the list</Box>
                  <Box>Sometime...</Box>
                  {renderList(
                    <React.Fragment>
                      <SvgSparkline id="sparkline-future" active />
                      <b>Sparkline</b>
                      <SvgCharts id="charts-future" active />
                      <b>Charts</b>
                      <SvgUpload active />
                      <b>Upload</b>
                      <SvgScheduler active />
                      <b>Scheduler</b>
                      <SvgGuage active />
                      <b>Gauge</b>
                    </React.Fragment>,
                  )}
                </Paper>
              </Box>
            </Grid>
          </ThemeProvider>
        </Grid>
      </Box>
    </Section>
  );
}

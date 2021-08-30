import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import { brandingDarkTheme } from 'docs/src/modules/brandingTheme';
import TableChartRounded from '@material-ui/icons/TableChartRounded';
import DateRangeRounded from '@material-ui/icons/DateRangeRounded';
import AccountTreeRounded from '@material-ui/icons/AccountTreeRounded';
import ShowChartRounded from '@material-ui/icons/ShowChartRounded';
import BarChartRounded from '@material-ui/icons/BarChartRounded';
import FileUploadRounded from '@material-ui/icons/FileUploadRounded';
import PendingActionsRounded from '@material-ui/icons/PendingActions';
import SpeedRounded from '@material-ui/icons/SpeedRounded';

// const darkDesignTokens = getDesignTokens('dark');
// let darkTheme = createTheme(darkDesignTokens);
// darkTheme = createTheme(darkTheme, getThemedComponents(darkTheme));
// // @ts-ignore
// darkTheme.components.MuiPaper.styleOverrides.outlined.backgroundColor =
//   darkTheme.palette.primaryDark[600];

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
    <ThemeProvider theme={brandingDarkTheme}>
      <Section bg="dim">
        <Box sx={{ py: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box maxWidth={500}>
                <SectionHeadline
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
                    bgcolor: 'primaryDark.600',
                  },
                  '& svg': {
                    color: 'primary.300',
                  },
                }}
              >
                <Paper variant="outlined">
                  <Box sx={{ fontWeight: 'bold' }}>In the lab:</Box>
                  <Box>Almost ready to go.</Box>
                  {renderList(
                    <React.Fragment>
                      <TableChartRounded />
                      <b>Data Grid</b>
                      <DateRangeRounded />
                      <b>Date Picker</b>
                      <AccountTreeRounded />
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
                        <TableChartRounded />
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
                      <ShowChartRounded />
                      <b>Sparkline</b>
                      <BarChartRounded />
                      <b>Charts</b>
                      <FileUploadRounded />
                      <b>Upload</b>
                      <PendingActionsRounded />
                      <b>Scheduler</b>
                      <SpeedRounded />
                      <b>Gauge</b>
                    </React.Fragment>,
                  )}
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Section>
    </ThemeProvider>
  );
}

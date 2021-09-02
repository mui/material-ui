import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import { brandingDarkTheme } from 'docs/src/modules/brandingTheme';
import TableChartRounded from '@mui/icons-material/TableChartRounded';
import DateRangeRounded from '@mui/icons-material/DateRangeRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import ShowChartRounded from '@mui/icons-material/ShowChartRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import FileUploadRounded from '@mui/icons-material/FileUploadRounded';
import PendingActionsRounded from '@mui/icons-material/PendingActions';
import SpeedRounded from '@mui/icons-material/SpeedRounded';

export default function XRoadmap() {
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
                  description="It's just the beginning of the MUI X components. Stay tuned for the exciting news and updates coming soon!"
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
                  <Box sx={{color: (theme) => theme.palette.text.secondary}}>Almost ready to go.</Box>
                  {renderList(
                    <React.Fragment>
                      <TableChartRounded fontSize="small" />
                      <b>Data Grid</b>
                      <DateRangeRounded fontSize="small" />
                      <b>Date Picker</b>
                      <AccountTreeRounded fontSize="small" />
                      <b>Tree View</b>
                    </React.Fragment>,
                  )}
                </Paper>
                <Paper variant="outlined">
                  <Box sx={{ fontWeight: 'bold' }}>Working in progress</Box>
                  <Box sx={{color: (theme) => theme.palette.text.secondary}}>Getting there.</Box>
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
                        <TableChartRounded fontSize="small" />
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
                  <Box sx={{color: (theme) => theme.palette.text.secondary}}>Sometime soon...</Box>
                  {renderList(
                    <React.Fragment>
                      <ShowChartRounded fontSize="small" />
                      <b>Sparkline</b>
                      <BarChartRounded fontSize="small" />
                      <b>Charts</b>
                      <FileUploadRounded fontSize="small" />
                      <b>Upload</b>
                      <PendingActionsRounded fontSize="small" />
                      <b>Scheduler</b>
                      <SpeedRounded fontSize="small" />
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

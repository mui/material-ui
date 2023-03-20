import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import TableChartRounded from '@mui/icons-material/TableChartRounded';
import DateRangeRounded from '@mui/icons-material/DateRangeRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import ShowChartRounded from '@mui/icons-material/ShowChartRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import FileUploadRounded from '@mui/icons-material/FileUploadRounded';
import PendingActionsRounded from '@mui/icons-material/PendingActions';
import SpeedRounded from '@mui/icons-material/SpeedRounded';

export default function XRoadmap() {
  function renderList(content: React.ReactElement, nested?: boolean) {
    return (
      <Box
        sx={{
          mt: 2,
          display: 'grid',
          alignItems: 'center',
          gap: 2,
          gridTemplateColumns: 'max-content 1fr',
          position: 'relative',
          ...(nested && {
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              width: 2,
              bgcolor: 'primaryDark.400',
              top: 24,
              bottom: 10,
              left: 10,
            },
          }),
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
          width: 15,
          bgcolor: 'primaryDark.400',
        },
        '&:after': {
          content: '""',
          width: 6,
          height: 6,
          bgcolor: 'warning.500',
          borderRadius: '50%',
          display: 'block',
          marginRight: 1.5,
        },
      }}
    />
  );
  return (
    <Section data-mui-color-scheme="dark" bg="dim">
      <Box>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={5}>
            <Box maxWidth={500} sx={{ mb: { xs: 2, sm: 0 } }}>
              <SectionHeadline
                overline="Roadmap"
                title="Follow the MUI X roadmap for future updates"
                description="It's just the beginning of the MUI X components. Stay tuned for the exciting news and updates coming soon!"
              />
              <Button
                component={Link}
                href={ROUTES.roadmap}
                noLinkStyle
                size="large"
                variant="contained"
                endIcon={<KeyboardArrowRightRounded />}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                See the roadmap
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            lg="auto"
            container
            spacing={2}
            sx={{
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
            <Grid item xs={12} sm={4} lg="auto">
              <Paper variant="outlined" sx={{ minWidth: { lg: 180 } }}>
                <Box sx={{ fontWeight: 'bold' }}>Released</Box>
                <Box sx={{ color: 'text.secondary' }}>More updates coming.</Box>
                {renderList(
                  <React.Fragment>
                    <TableChartRounded fontSize="small" />
                    <b>Data Grid</b>
                    <DateRangeRounded fontSize="small" />
                    <b>Date Picker</b>
                  </React.Fragment>,
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4} lg="auto">
              <Paper variant="outlined" sx={{ minWidth: { lg: 180 } }}>
                <Box sx={{ fontWeight: 'bold' }}>Work in progress</Box>
                <Box sx={{ color: 'text.secondary' }}>Getting there.</Box>
                {renderList(
                  <React.Fragment>
                    <Box
                      sx={{
                        lineHeight: 0,
                      }}
                    >
                      <TableChartRounded fontSize="small" />
                    </Box>
                    <b>Data Grid</b>
                    {bullet}
                    <b>Charts integration</b>
                    {bullet}
                    <b>Pivoting</b>
                    {bullet}
                    <Link href={ROUTES.dataGridFeaturesComparison} sx={{ color: 'primary.300' }}>
                      And more!
                    </Link>
                  </React.Fragment>,
                  true,
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4} lg="auto">
              <Paper variant="outlined" sx={{ minWidth: { lg: 180 } }}>
                <Box sx={{ fontWeight: 'bold' }}>On the list</Box>
                <Box sx={{ color: 'text.secondary' }}>Starting sometime soon…</Box>
                {renderList(
                  <React.Fragment>
                    <ShowChartRounded fontSize="small" />
                    <b>Sparkline</b>
                    <BarChartRounded fontSize="small" />
                    <b>Charts</b>
                    <AccountTreeRounded fontSize="small" />
                    <b>Tree View</b>
                    <FileUploadRounded fontSize="small" />
                    <b>Upload</b>
                    <PendingActionsRounded fontSize="small" />
                    <b>Scheduler</b>
                    <SpeedRounded fontSize="small" />
                    <b>Gauge</b>
                  </React.Fragment>,
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Section>
  );
}

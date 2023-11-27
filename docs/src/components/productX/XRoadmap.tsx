import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import TableChartRounded from '@mui/icons-material/TableChartRounded';
import DateRangeRounded from '@mui/icons-material/DateRangeRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import ShowChartRounded from '@mui/icons-material/ShowChartRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import FileUploadRounded from '@mui/icons-material/FileUploadRounded';
import PendingActionsRounded from '@mui/icons-material/PendingActions';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';
import SpeedRounded from '@mui/icons-material/SpeedRounded';
import { alpha } from '@mui/material/styles';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Section from 'docs/src/layouts/Section';

export default function XRoadmap() {
  function renderList(content: React.ReactElement, nested?: boolean) {
    return (
      <Box
        sx={{
          mt: 2,
          display: 'grid',
          alignItems: 'center',
          gap: 1.5,
          gridTemplateColumns: 'max-content 1fr',
          position: 'relative',
          fontWeight: 'semiBold',
          ...(nested && {
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              width: 1.5,
              bgcolor: 'primaryDark.600',
              top: 24,
              bottom: 10,
              left: 8,
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
          height: 1.5,
          width: 15,
          bgcolor: 'primaryDark.600',
        },
      }}
    />
  );
  return (
    <Section
      cozy
      data-mui-color-scheme="dark"
      sx={{
        color: 'text.secondary',
        background: (theme) =>
          `linear-gradient(180deg, ${(theme.vars || theme).palette.primaryDark[800]} 50%, 
        ${alpha(theme.palette.primary[800], 0.2)} 100%), ${
            (theme.vars || theme).palette.primaryDark[800]
          }`,
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={12} md={5}>
          <SectionHeadline
            overline="Roadmap"
            title="Follow the MUI X roadmap for future updates"
            description="It's just the beginning of the MUI X components. Stay tuned for the exciting news and updates coming soon!"
          />
          <Button
            component={Link}
            href={ROUTES.xRoadmap}
            noLinkStyle
            size="large"
            variant="contained"
            endIcon={<KeyboardArrowRightRounded />}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            See the roadmap
          </Button>
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
              minWidth: { lg: 180 },
            },
            '& svg': {
              color: 'primary.300',
            },
          }}
        >
          <Grid item xs={12} sm={4} lg="auto">
            <Paper variant="outlined">
              <Typography fontWeight="bold" variant="body2" color="text.primary">
                Released
                <Box
                  sx={{
                    ml: 1,
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: 10,
                    bgcolor: 'success.main',
                  }}
                />
              </Typography>
              {renderList(
                <React.Fragment>
                  <TableChartRounded sx={{ fontSize: 16 }} />
                  Data Grid
                  <DateRangeRounded sx={{ fontSize: 16 }} />
                  Date and Time Pickers
                  <BarChartRounded sx={{ fontSize: 16 }} />
                  Charts
                  <AccountTreeRounded sx={{ fontSize: 16 }} />
                  Tree View
                </React.Fragment>,
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} lg="auto">
            <Paper variant="outlined">
              <Typography fontWeight="bold" variant="body2" color="text.primary">
                Work in progress
                <Box
                  sx={{
                    ml: 1,
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: 10,
                    bgcolor: 'warning.main',
                  }}
                />
              </Typography>
              {renderList(
                <React.Fragment>
                  <Box
                    sx={{
                      lineHeight: 0,
                    }}
                  >
                    <TableChartRounded sx={{ fontSize: 16 }} />
                  </Box>
                  Data Grid
                  {bullet}
                  Pivoting
                  {bullet}
                  Charts integration
                  {bullet}
                  <Link href={ROUTES.dataGridFeaturesComparison} sx={{ color: 'primary.300' }}>
                    And more!
                  </Link>
                </React.Fragment>,
                true,
              )}
              {renderList(
                <React.Fragment>
                  <Box
                    sx={{
                      lineHeight: 0,
                    }}
                  >
                    <AccountTreeRounded sx={{ fontSize: 16 }} />
                  </Box>
                  Tree View
                  {bullet}
                  Virtualization
                  {bullet}
                  Drag and Drop
                </React.Fragment>,
                true,
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} lg="auto">
            <Paper variant="outlined">
              <Typography fontWeight="bold" variant="body2" color="text.primary">
                Sometime soon
                <Box
                  sx={{
                    ml: 1,
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: 10,
                    bgcolor: 'primaryDark.400',
                  }}
                />
              </Typography>
              {renderList(
                <React.Fragment>
                  <ShowChartRounded sx={{ fontSize: 16 }} />
                  Sparkline
                  <InsertDriveFileOutlined sx={{ fontSize: 16 }} />
                  Rich Text Editor
                  <FileUploadRounded sx={{ fontSize: 16 }} />
                  Upload
                  <PendingActionsRounded sx={{ fontSize: 16 }} />
                  Scheduler
                  <SpeedRounded sx={{ fontSize: 16 }} />
                  Gauge
                </React.Fragment>,
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Section>
  );
}

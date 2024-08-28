import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import PivotTableChartRoundedIcon from '@mui/icons-material/PivotTableChartRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import FileUploadRounded from '@mui/icons-material/FileUploadRounded';
import PendingActionsRounded from '@mui/icons-material/PendingActions';
import FormatSizeRoundedIcon from '@mui/icons-material/FormatSizeRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import SpeedRounded from '@mui/icons-material/SpeedRounded';
import { alpha } from '@mui/material/styles';
import ROUTES from 'docs/src/route';
import { Link } from '@mui/docs/Link';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Section from 'docs/src/layouts/Section';
import GradientText from 'docs/src/components/typography/GradientText';

interface RoadmapStatusDotProps {
  color: string;
}

function RoadmapStatusDot({ color }: RoadmapStatusDotProps) {
  return (
    <Box
      sx={{
        ml: 1,
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: 10,
        bgcolor: `${color}`,
      }}
    />
  );
}

export default function XRoadmap() {
  function renderList(content: React.ReactElement<any>, nested?: boolean) {
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
            '&::before': {
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
        '&::before': {
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
          `linear-gradient(180deg, ${(theme.vars || theme).palette.primaryDark[900]} 50%, 
        ${alpha(theme.palette.primary[800], 0.2)} 100%), ${
          (theme.vars || theme).palette.primaryDark[900]
        }`,
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid size={{ xs: 12, md: 5 }}>
          <SectionHeadline
            overline="Roadmap"
            title={
              <Typography variant="h2">
                Follow the <GradientText>MUI X roadmap</GradientText> for future updates
              </Typography>
            }
            description="It's just the beginning for the MUI X components. Stay tuned for exciting news and updates coming soon!"
          />
          <Button
            component={Link}
            href={ROUTES.xRoadmap}
            noLinkStyle
            variant="contained"
            endIcon={<KeyboardArrowRightRounded />}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            See the roadmap
          </Button>
        </Grid>
        <Grid
          size={{ xs: 12, md: 7, lg: 'auto' }}
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
          <Grid size={{ xs: 12, sm: 4, lg: 'auto' }}>
            <Paper variant="outlined">
              <Typography
                component="div"
                variant="body2"
                sx={{ fontWeight: 'bold', color: 'text.primary' }}
              >
                Stable
                <RoadmapStatusDot color="success.main" />
              </Typography>
              {renderList(
                <React.Fragment>
                  <PivotTableChartRoundedIcon sx={{ fontSize: 16 }} />
                  Data Grid
                  <CalendarMonthRoundedIcon sx={{ fontSize: 16 }} />
                  Date and Time Pickers
                  <BarChartRounded sx={{ fontSize: 16 }} />
                  Charts
                  <AccountTreeRounded sx={{ fontSize: 16 }} />
                  Tree View
                </React.Fragment>,
              )}
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, lg: 'auto' }}>
            <Paper variant="outlined">
              <Typography
                component="div"
                variant="body2"
                sx={{ fontWeight: 'bold', color: 'text.primary' }}
              >
                Work in progress
                <RoadmapStatusDot color="warning.main" />
              </Typography>
              {renderList(
                <React.Fragment>
                  <Box sx={{ lineHeight: 0 }}>
                    <PivotTableChartRoundedIcon sx={{ fontSize: 16 }} />
                  </Box>
                  Data Grid
                  {bullet}
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontWeight: 'medium' }}
                  >
                    Pivoting
                  </Typography>
                  {bullet}
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontWeight: 'medium' }}
                  >
                    Charts integration
                  </Typography>
                  {bullet}
                  <Link href={ROUTES.dataGridFeaturesComparison} sx={{ color: 'primary.300' }}>
                    And more!
                  </Link>
                </React.Fragment>,
                true,
              )}
              {renderList(
                <React.Fragment>
                  <Box sx={{ lineHeight: 0 }}>
                    <AccountTreeRounded sx={{ fontSize: 16 }} />
                  </Box>
                  Tree View
                  {bullet}
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontWeight: 'medium' }}
                  >
                    Virtualization
                  </Typography>
                  {bullet}
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontWeight: 'medium' }}
                  >
                    Drag and Drop
                  </Typography>
                </React.Fragment>,
                true,
              )}
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, lg: 'auto' }}>
            <Paper variant="outlined">
              <Typography
                component="div"
                variant="body2"
                sx={{ fontWeight: 'bold', color: 'text.primary' }}
              >
                Future components
                <RoadmapStatusDot color="primaryDark.400" />
              </Typography>
              {renderList(
                <React.Fragment>
                  <AutoGraphRoundedIcon sx={{ fontSize: 16 }} />
                  Sparkline
                  <FormatSizeRoundedIcon sx={{ fontSize: 16 }} />
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

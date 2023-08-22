import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TableChartRounded from '@mui/icons-material/TableChartRounded';
import DateRangeRounded from '@mui/icons-material/DateRangeRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import ShowChartRounded from '@mui/icons-material/ShowChartRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import XGridFullDemo from 'docs/src/components/productX/XGridFullDemo';
import XDateRangeDemo from 'docs/src/components/productX/XDateRangeDemo';
import XTreeViewDemo from 'docs/src/components/productX/XTreeViewDemo';
import XChartsDemo from 'docs/src/components/productX/XChartsDemo';
import XSparklineDemo from 'docs/src/components/productX/XSparklineDemo';
import More from 'docs/src/components/action/More';
import ROUTES from 'docs/src/route';
import IconImage from 'docs/src/components/icon/IconImage';

const DEMOS = ['Data Grid', 'Date Range Picker', 'Charts', 'Tree View', 'Sparkline'];
const WIP = DEMOS.slice(4);

function PrefetchImages() {
  function makeImg(component: 'sparkline' | 'chart', mode: string, num: number) {
    return {
      loading: 'lazy' as const,
      width: 100,
      src: `/static/branding/mui-x/${component}-${mode}${num}.png`,
    };
  }
  return (
    <Box
      sx={{
        width: 0,
        height: 0,
        visibility: 'hidden',
        '& > img': {
          position: 'absolute',
        },
      }}
    >
      {[...Array(2)].map((_, index) => (
        <React.Fragment key={index}>
          <img alt="" {...makeImg('sparkline', 'light', index + 1)} />
          <img alt="" {...makeImg('sparkline', 'dark', index + 1)} />
        </React.Fragment>
      ))}
      {[...Array(4)].map((_, index) => (
        <React.Fragment key={index}>
          <img alt="" {...makeImg('chart', 'light', index + 1)} />
          <img alt="" {...makeImg('chart', 'dark', index + 1)} />
        </React.Fragment>
      ))}
    </Box>
  );
}

export default function XComponents() {
  const [demo, setDemo] = React.useState(DEMOS[1]);
  const icons = {
    [DEMOS[0]]: <TableChartRounded fontSize="small" />,
    [DEMOS[1]]: <DateRangeRounded fontSize="small" />,
    [DEMOS[2]]: <BarChartRounded fontSize="small" />,
    [DEMOS[3]]: <AccountTreeRounded fontSize="small" />,
    [DEMOS[4]]: <ShowChartRounded fontSize="small" />,
  };
  return (
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box sx={{ maxWidth: 500 }}>
            <SectionHeadline
              overline="React component library"
              title={
                <Typography variant="h2">
                  Powerful components for <GradientText>advanced</GradientText> use-cases
                </Typography>
              }
              description="The MUI X package enables applications to have complex use-cases, supported by several advanced components."
            />
          </Box>
          <Group desktopColumns={2} sx={{ mt: 4 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item icon={React.cloneElement(icons[name])} title={name} />
                {WIP.includes(name) && (
                  <IconImage name="time" title="Work in progress" sx={{ ml: 'auto', mr: 2 }} />
                )}
              </Highlighter>
            ))}
            <More href={ROUTES.roadmap} />
          </Group>
        </Grid>
        <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
          <PrefetchImages />
          {demo === DEMOS[0] && (
            <Fade in timeout={500}>
              <Box sx={{ height: '100%' }}>
                <XGridFullDemo />
              </Box>
            </Fade>
          )}
          {demo === DEMOS[1] && (
            <Fade in timeout={500}>
              <div>
                <XDateRangeDemo />
              </div>
            </Fade>
          )}
          {demo === DEMOS[2] && (
            <Fade in timeout={500}>
              <div>
                <XChartsDemo />
              </div>
            </Fade>
          )}
          {demo === DEMOS[3] && (
            <Fade in timeout={500}>
              <div>
                <XTreeViewDemo />
              </div>
            </Fade>
          )}
          {demo === DEMOS[4] && (
            <Fade in timeout={500}>
              <div>
                <XSparklineDemo />
              </div>
            </Fade>
          )}
        </Grid>
      </Grid>
    </Section>
  );
}

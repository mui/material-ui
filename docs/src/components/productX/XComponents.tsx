import * as React from 'react';
import Box from '@mui/material/Box';
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
import XComponentsSwitcher from 'docs/src/components/productX/XComponentsSwitcher';
import XGridFullDemo from 'docs/src/components/productX/XGridFullDemo';
import XDateRangeDemo from 'docs/src/components/productX/XDateRangeDemo';
import XTreeViewDemo from 'docs/src/components/productX/XTreeViewDemo';
import XChartsDemo from 'docs/src/components/productX/XChartsDemo';

const DEMOS = ['Data Grid', 'Date and Time Pickers', 'Charts', 'Tree View', 'Sparkline'];
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
  const [productIndex, setProductIndex] = React.useState(0);
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
        <Grid item md={6}>
          <SectionHeadline
            overline="React component library"
            title={
              <Typography variant="h2">
                Powerful components for <GradientText>advanced</GradientText> use-cases
              </Typography>
            }
            description="The MUI X package enables applications to have complex use-cases, supported by several advanced components."
          />
          <Box sx={{ mt: 4 }} />
          <XComponentsSwitcher productIndex={productIndex} setProductIndex={setProductIndex} />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={productIndex === 0 ? { minHeight: { xs: 777, sm: 757, md: 'unset' } } : {}}
        >
          <React.Fragment>
            {productIndex === 0 && <XGridFullDemo />}
            {productIndex === 1 && <XDateRangeDemo />}
            {productIndex === 2 && <XChartsDemo />}
            {productIndex === 3 && <XTreeViewDemo />}
          </React.Fragment>
        </Grid>
      </Grid>
    </Section>
  );
}

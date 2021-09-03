import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import TableChartRounded from '@mui/icons-material/TableChartRounded';
import DateRangeRounded from '@mui/icons-material/DateRangeRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import ShowChartRounded from '@mui/icons-material/ShowChartRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import XGridFullDemo from 'docs/src/components/productX/XGridFullDemo';
import XDateRangeDemo from 'docs/src/components/productX/XDateRangeDemo';

const DEMOS = ['Data Grid', 'Date Picker', 'Tree View', 'Sparkline', 'Charts'];

export default function XComponents() {
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <TableChartRounded fontSize="small" />,
    [DEMOS[1]]: <DateRangeRounded fontSize="small" />,
    [DEMOS[2]]: <AccountTreeRounded fontSize="small" />,
    [DEMOS[3]]: <ShowChartRounded fontSize="small" />,
    [DEMOS[4]]: <BarChartRounded fontSize="small" />,
  };
  return (
    <Section bg="comfort">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Component library"
              title={
                <Typography variant="h2">
                  Powerful components for <GradientText>advanced</GradientText> use-cases
                </Typography>
              }
              description="The MUI X package enables applications to have complex use-cases, supported by several advanced components."
            />
          </Box>
          <Group desktopColumns={2} sx={{ mt: 4 }}>
            {DEMOS.map((name, index) => (
              <Highlighter
                disabled={![0, 1].includes(index)}
                key={name}
                selected={name === demo}
                onClick={() => setDemo(name)}
              >
                <Item icon={React.cloneElement(icons[name])} title={name} />
              </Highlighter>
            ))}
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          {demo === DEMOS[0] && (
            <Fade in timeout={500}>
              <Box sx={{ height: '100%' }}>
                <XGridFullDemo />
              </Box>
            </Fade>
          )}
          {demo === DEMOS[1] && (
            <Fade in timeout={500}>
              <Box>
                <XDateRangeDemo />
              </Box>
            </Fade>
          )}
        </Grid>
      </Grid>
    </Section>
  );
}

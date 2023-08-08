import * as React from 'react';
import Box from '@mui/material/Box';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TableChartRounded from '@mui/icons-material/TableChartRounded';
import DateRangeRounded from '@mui/icons-material/DateRangeRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import ShowChartRounded from '@mui/icons-material/ShowChartRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import More from 'docs/src/components/action/More';
import Frame from 'docs/src/components/action/Frame';
import TabsUsage from 'docs/data/joy/components/tabs/TabsUsage';

const DEMOS = ['Tabs', 'Radio', 'Menu', 'Input', 'Select', 'Slider', 'Button', 'Alert'] as const;

export default function JoyUIComponents() {
  const [demo, setDemo] = React.useState<(typeof DEMOS)[number]>(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <TableChartRounded fontSize="small" />,
    [DEMOS[1]]: <DateRangeRounded fontSize="small" />,
    [DEMOS[2]]: <AccountTreeRounded fontSize="small" />,
    [DEMOS[3]]: <ShowChartRounded fontSize="small" />,
    [DEMOS[4]]: <BarChartRounded fontSize="small" />,
    [DEMOS[5]]: <BarChartRounded fontSize="small" />,
    [DEMOS[6]]: <BarChartRounded fontSize="small" />,
    [DEMOS[7]]: <BarChartRounded fontSize="small" />,
  };
  return (
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid md={5} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Components"
              title={
                <Typography variant="h2">
                  Simple, <GradientText>good looking</GradientText>, and reliable components
                </Typography>
              }
              description="Foundational pre-built components that look beautiful by default, building off of years from the Material UI experience."
            />
          </Box>
          <Group desktopColumns={3} sx={{ mt: 4 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item icon={React.cloneElement(icons[name])} title={name} />
              </Highlighter>
            ))}
            <More disableStartIcon />
          </Group>
        </Grid>
        <Grid xs={12} md={7}>
          <TabsUsage />
        </Grid>
      </Grid>
    </Section>
  );
}

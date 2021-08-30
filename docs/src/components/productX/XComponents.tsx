import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import TableChartRounded from '@material-ui/icons/TableChartRounded';
import DateRangeRounded from '@material-ui/icons/DateRangeRounded';
import AccountTreeRounded from '@material-ui/icons/AccountTreeRounded';
import ShowChartRounded from '@material-ui/icons/ShowChartRounded';
import BarChartRounded from '@material-ui/icons/BarChartRounded';

const DEMOS = ['Data Grid', 'Date Picker', 'Tree View', 'Sparkline', 'Charts'];

export default function CoreComponents() {
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <TableChartRounded />,
    [DEMOS[1]]: <DateRangeRounded />,
    [DEMOS[2]]: <AccountTreeRounded />,
    [DEMOS[3]]: <ShowChartRounded />,
    [DEMOS[4]]: <BarChartRounded />,
  };
  return (
    <Section bg="comfort">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="What do you get?"
              title={
                <Typography variant="h2">
                  Complex components for <GradientText>advanced</GradientText> use-cases
                </Typography>
              }
              description="Leverage the X package to build heavy data applications. We'll be adding many more components further along."
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
          <div />
        </Grid>
      </Grid>
    </Section>
  );
}

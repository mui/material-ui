import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import SvgDashboard from 'docs/src/icons/SvgDashboard';
import SvgEcommerce from 'docs/src/icons/SvgEcommerce';
import SvgLandingPage from 'docs/src/icons/SvgLandingPage';
import Highlighter from 'docs/src/components/action/Highlighter';
import More from 'docs/src/components/action/More';

const DEMOS = ['Dashboard', 'Landing Pages', 'E-commerce'];

export default function TemplateDemo() {
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <SvgDashboard />,
    [DEMOS[1]]: <SvgLandingPage />,
    [DEMOS[2]]: <SvgEcommerce />,
  };
  return (
    <Section bg="comfort">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Use cases"
              title={
                <Typography variant="h2">
                  Get the right template for your <GradientText>specific need</GradientText>
                </Typography>
              }
              description="We've gathered templates for lots of use-cases, all powered with the Core components carefully curated from MUI's team."
            />
          </Box>
          <Group desktopColumns={2} sx={{ mt: 4 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item
                  icon={React.cloneElement(icons[name], { active: name === demo })}
                  title={name}
                />
              </Highlighter>
            ))}
            <More />
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <div />
        </Grid>
      </Grid>
    </Section>
  );
}

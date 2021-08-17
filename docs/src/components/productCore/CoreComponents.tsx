import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import SvgButton from 'docs/src/icons/SvgButton';
import SvgTypography from 'docs/src/icons/SvgTypography';
import SvgTable from 'docs/src/icons/SvgTable';
import SvgAlert from 'docs/src/icons/SvgAlert';
import SvgDrawer from 'docs/src/icons/SvgDrawer';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import More from 'docs/src/components/action/More';

const DEMOS = ['Button', 'Text field', 'Table', 'Alert', 'Drawer'];

export default function CoreComponents() {
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <SvgButton />,
    [DEMOS[1]]: <SvgTypography />,
    [DEMOS[2]]: <SvgTable />,
    [DEMOS[3]]: <SvgAlert />,
    [DEMOS[4]]: <SvgDrawer />,
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
                  <GradientText>40+</GradientText> building block components
                </Typography>
              }
              description="We have built the foundational components for your design system, enabling you to launch even faster that cool product you've been thinking about. We got your back!"
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

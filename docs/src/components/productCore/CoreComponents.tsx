import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputRounded from '@material-ui/icons/InputRounded';
import SmartButtonRounded from '@material-ui/icons/SmartButtonRounded';
import ListAltRounded from '@material-ui/icons/ListAltRounded';
import TableViewRounded from '@material-ui/icons/TableViewRounded';
import WarningRounded from '@material-ui/icons/WarningRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import More from 'docs/src/components/action/More';

const DEMOS = ['Button', 'Text field', 'Table', 'Alert', 'Drawer'];

export default function CoreComponents() {
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <SmartButtonRounded />,
    [DEMOS[1]]: <InputRounded />,
    [DEMOS[2]]: <TableViewRounded />,
    [DEMOS[3]]: <WarningRounded />,
    [DEMOS[4]]: <ListAltRounded />,
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

import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import SvgEdit from 'docs/src/icons/SvgEdit';
import SvgFilter from 'docs/src/icons/SvgFilter';
import SvgSelection from 'docs/src/icons/SvgSelection';
import SvgSorting from 'docs/src/icons/SvgSorting';
import SvgPagination from 'docs/src/icons/SvgPagination';
import More from 'docs/src/components/action/More';

const DEMOS = ['Editing', 'Selection', 'Sorting', 'Pagination', 'Filtering'];

export default function CoreTheming() {
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <SvgEdit />,
    [DEMOS[1]]: <SvgSelection />,
    [DEMOS[2]]: <SvgSorting />,
    [DEMOS[3]]: <SvgPagination />,
    [DEMOS[4]]: <SvgFilter />,
  };
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Data Grid"
              title={
                <Typography variant="h2">
                  A level of <GradientText>performance and quality</GradientText> that hasn&apos;t
                  been seen before
                </Typography>
              }
              description="The MUI Data Grid is a data table powerhouse. It is packed with exclusive features that will enrich the experience of dealing with lots of data."
            />
          </Box>
          <Group desktopColumns={2} sx={{ mt: 4 }}>
            {DEMOS.map((name) => (
              <Highlighter
                selectedBg="comfort"
                key={name}
                selected={name === demo}
                onClick={() => setDemo(name)}
              >
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

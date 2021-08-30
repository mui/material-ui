import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import More from 'docs/src/components/action/More';
import EditOutlined from '@material-ui/icons/EditOutlined';
import HighlightAltRounded from '@material-ui/icons/HighlightAltRounded';
import SortByAlphaRounded from '@material-ui/icons/SortByAlphaRounded';
import AutoStoriesOutlined from '@material-ui/icons/AutoStoriesOutlined';
import FilterAltOutlined from '@material-ui/icons/FilterAltOutlined';

const DEMOS = ['Editing', 'Selection', 'Sorting', 'Pagination', 'Filtering'];

export default function CoreTheming() {
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <EditOutlined />,
    [DEMOS[1]]: <HighlightAltRounded />,
    [DEMOS[2]]: <SortByAlphaRounded />,
    [DEMOS[3]]: <AutoStoriesOutlined />,
    [DEMOS[4]]: <FilterAltOutlined />,
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

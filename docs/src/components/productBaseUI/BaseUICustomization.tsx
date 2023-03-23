import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SvgTwinkle from 'docs/src/icons/SvgTwinkle';
import Section from 'docs/src/layouts/Section';
import Highlighter from 'docs/src/components/action/Highlighter';
import Item, { Group } from 'docs/src/components/action/Item';
import GradientText from 'docs/src/components/typography/GradientText';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';

export default function BaseUICustomization() {
  return (
    <Section bg="comfort">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Customization"
              title={
                <Typography variant="h2">
                  <GradientText>Freedom to decide</GradientText> how to customize
                </Typography>
              }
              description="With MUI Base, you have the freedom to decide how much you want to customize a component's structure and style."
            />
          </Box>
          <Group sx={{ mt: 4 }}>
            <Highlighter disableBorder selected>
              <Item
                icon={<SvgTwinkle />}
                title="Applying custom CSS rules"
                description="With MUI Base, you have the freedom to decide how much you want to customize a component's structure and style."
              />
            </Highlighter>
            <Highlighter disableBorder>
              <Item
                icon={<SvgTwinkle />}
                title="Overriding subcomponent slots"
                description='Override the default subcomponents ("slots") using the components and/or component prop to make changes to a component&apos;s rendered HTML structure.'
              />
            </Highlighter>
            <Highlighter disableBorder>
              <Item
                icon={<SvgTwinkle />}
                title="Creating custom components using hooks"
                description="Make changes to a component's rendered HTML structure."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <div />
        </Grid>
      </Grid>
    </Section>
  );
}

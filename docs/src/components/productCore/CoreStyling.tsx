import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import SvgTwinkle from 'docs/src/icons/SvgTwinkle';

export default function CoreStyling() {
  return (
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Styling"
              title={
                <Typography variant="h2">
                  Quickly design as you want it to be with{' '}
                  <GradientText>CSS utilities</GradientText>
                </Typography>
              }
              description="Want to customize the components down to the smallest detail? We provide built-in CSS utilities for rapid styling."
            />
          </Box>
          <Group sx={{ mt: 4 }}>
            <Highlighter disableBorder selected>
              <Item
                icon={<SvgTwinkle />}
                title="Leverage the tokens from your theme"
                description="Easily use the design tokens defined in your theme for any CSS property out there."
              />
            </Highlighter>
            <Highlighter disableBorder sx={{ '& svg': { opacity: 0.5 } }}>
              <Item
                icon={<SvgTwinkle />}
                title="No context switching"
                description="The styling and component usage are both in the same place, right where you need them."
              />
            </Highlighter>
            <Highlighter disableBorder sx={{ '& svg': { opacity: 0.5 } }}>
              <Item
                icon={<SvgTwinkle />}
                title="Take care of your consistency game"
                description="Even when customizing, you can still maintain consistency constrained by the theme's design tokens."
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

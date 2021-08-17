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
import SvgMaterialDesign from 'docs/src/icons/SvgMaterialDesign';

export default function CoreTheming() {
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Theming"
              title={
                <Typography variant="h2">
                  Choose the <GradientText>design</GradientText> you like the most
                </Typography>
              }
              description="Leverage the theming capabilities to easily make the components look how you want them to be. You can also quick start with Material Design."
            />
          </Box>
          <Group sx={{ mt: 4 }}>
            <Highlighter disableBorder selected>
              <Item
                icon={<SvgTwinkle />}
                title="Custom Theme"
                description="Make the components look your own and reflect your branding and personality."
              />
            </Highlighter>
            <Highlighter disableBorder>
              <Item
                icon={<SvgMaterialDesign />}
                title="Material Design"
                description="Leverage the tried and test Google's Material Design to quick-strart you design system."
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

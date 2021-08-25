import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import { MuiStats } from 'docs/src/components/home/Testimonials';
import { brandingDarkTheme } from 'docs/src/modules/brandingTheme';

export default function CoreHeroEnd() {
  return (
    <ThemeProvider theme={brandingDarkTheme}>
      <Section bg="dim">
        <Box sx={{ py: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={6}>
              <Box maxWidth={500}>
                <SectionHeadline
                  overline="Community"
                  title="Get and give help by joining our contributors community"
                  description="The core components were crafted by many hands, all over the world. Join the community to help us expand it even further!"
                />
                <Button
                  aria-label="Goto documentation"
                  component={Link}
                  href={ROUTES.documentation}
                  noLinkStyle
                  size="large"
                  variant="contained"
                  endIcon={<KeyboardArrowRightRounded />}
                >
                  Learn more
                </Button>
              </Box>
            </Grid>
            <MuiStats />
          </Grid>
        </Box>
      </Section>
    </ThemeProvider>
  );
}

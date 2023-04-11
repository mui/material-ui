import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import MuiStatistics from 'docs/src/components/home/MuiStatistics';

export default function CoreHeroEnd() {
  return (
    <Section bg="dim" data-mui-color-scheme="dark">
      <Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item md={6}>
            <Box maxWidth={500} sx={{ mb: 4 }}>
              <SectionHeadline
                overline="Community"
                title="Get and give help by joining our contributors community"
                description="The core components were crafted by many hands, all over the world. Join the community to help us expand it even further!"
              />
              <Button
                aria-label="Go to documentation"
                component={Link}
                href={ROUTES.communityHelp}
                noLinkStyle
                size="large"
                variant="contained"
                endIcon={<KeyboardArrowRightRounded />}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                Learn more
              </Button>
            </Box>
          </Grid>
          <MuiStatistics />
        </Grid>
      </Box>
    </Section>
  );
}

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
import { alpha } from '@mui/material/styles';

export default function CoreHeroEnd() {
  return (
    <Section
      cozy
      data-mui-color-scheme="dark"
      sx={{
        color: 'text.secondary',
        background: (theme) =>
          `linear-gradient(180deg, ${(theme.vars || theme).palette.primaryDark[800]} 50%, 
        ${alpha(theme.palette.primary[800], 0.2)} 100%), ${
            (theme.vars || theme).palette.primaryDark[800]
          }`,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item md={6}>
          <Box maxWidth={500} sx={{ mb: 4 }}>
            <SectionHeadline
              overline="Community"
              title="Join our global community"
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
    </Section>
  );
}

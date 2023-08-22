import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import { alpha } from '@mui/material/styles';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import MuiStatistics from 'docs/src/components/home/MuiStatistics';

export default function CoreHeroEnd() {
  return (
    <Section
      cozy
      data-mui-color-scheme="dark"
      sx={{
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
              title={
                <Typography variant="h2">
                  Join our <GradientText>global community</GradientText>
                </Typography>
              }
              description="The core components were crafted by many hands, all over the world. Join us today to get help when you need it, and lend a hand when you can."
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

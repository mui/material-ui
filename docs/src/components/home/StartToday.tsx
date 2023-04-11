import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from 'docs/src/modules/components/Link';
import GradientText from 'docs/src/components/typography/GradientText';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import ROUTES from 'docs/src/route';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';

export default function StartToday() {
  return (
    <Grid container spacing={{ xs: 5, md: 4 }} alignItems="center">
      <Grid item xs={12} sm={6} md={6} sx={{ mb: { md: 4 } }}>
        <SectionHeadline
          overline="Start now"
          title={
            <Typography variant="h2" sx={{ maxWidth: 460, mb: 1 }}>
              Ship your next project <GradientText>faster</GradientText>
            </Typography>
          }
          description="Find out why MUI's tools are trusted by thousands of open-source developers and teams around the world."
        />
        <GetStartedButtons />
      </Grid>
      <Grid item xs={12} sm={6} md={6} container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper
            component={Link}
            href={ROUTES.showcase}
            noLinkStyle
            variant="outlined"
            sx={{ p: 2, height: '100%' }}
          >
            <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
              Showcase
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Check out some great examples of MUI&apos;s products in action.
            </Typography>
            <Typography
              color="primary"
              variant="body2"
              fontWeight="bold"
              sx={{
                '& > svg': { transition: '0.2s' },
                '&:hover > svg': { transform: 'translateX(2px)' },
              }}
            >
              Learn more{' '}
              <KeyboardArrowRightRounded fontSize="small" sx={{ verticalAlign: 'middle' }} />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            component={Link}
            href={ROUTES.blog}
            noLinkStyle
            variant="outlined"
            sx={{ p: 2, height: '100%' }}
          >
            <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
              Blog
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Read the latest updates about our company and products.
            </Typography>
            <Typography
              color="primary"
              variant="body2"
              fontWeight="bold"
              sx={{
                '& > svg': { transition: '0.2s' },
                '&:hover > svg': { transform: 'translateX(2px)' },
              }}
            >
              Learn more{' '}
              <KeyboardArrowRightRounded fontSize="small" sx={{ verticalAlign: 'middle' }} />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

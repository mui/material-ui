import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from 'docs/src/modules/components/Link';
import GradientText from 'docs/src/components/typography/GradientText';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import ROUTES from 'docs/src/route';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';

const HeroEnd = () => {
  return (
    <Box
      sx={{
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? `linear-gradient(180deg, ${theme.palette.primaryDark[900]} 0%, #001E3C 100%)`
            : `linear-gradient(180deg, ${theme.palette.grey[50]} 0%, #FFFFFF 100%)`,
      }}
    >
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
          <Grid item xs={12} sm={6} md={6} sx={{ mb: { md: 4 } }}>
            <Typography color="primary.600" fontWeight="bold" variant="body2" sx={{ mb: 1 }}>
              Go live!
            </Typography>
            <Typography variant="h2" sx={{ maxWidth: 500, mb: 1 }}>
              Start building with <GradientText>MUI</GradientText> today!
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2, maxWidth: 450 }}>
              Check it for yourself, give it a try and share with us what you&apos;ve built!
            </Typography>
            <GetStartedButtons
              sx={{ '&& > *': { minWidth: 'clamp(0px, (426px - 100%) * 999 ,100%)' } }}
            />
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
                  Showcases
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  See more projects and companies out there relying on MUI.
                </Typography>
                <Typography color="primary.main" variant="body2" fontWeight="bold">
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
                  Check behind the scenes and news from the company.
                </Typography>
                <Typography color="primary.main" variant="body2" fontWeight="bold">
                  Learn more{' '}
                  <KeyboardArrowRightRounded fontSize="small" sx={{ verticalAlign: 'middle' }} />
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroEnd;

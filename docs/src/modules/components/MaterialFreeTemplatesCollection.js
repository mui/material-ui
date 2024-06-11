/* eslint-disable material-ui/no-hardcoded-labels */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import { useTranslate } from '@mui/docs/i18n';
import { useTheme } from '@mui/material/styles';

const sourcePrefix = `${process.env.SOURCE_CODE_REPO}/tree/v${process.env.LIB_VERSION}`;

function layouts(translatation, theme) {
  const imageSuffix = theme.palette.mode === 'dark' ? '-dark' : '-light';
  return [
    {
      title: translatation('dashboardTitle'),
      description: translatation('dashboardDescr'),
      src: `/static/images/templates/dashboard${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/dashboard/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/dashboard`,
    },
    {
      title: translatation('landingPageTitle'),
      description: translatation('landingPageDescr'),
      src: `/static/images/templates/landing-page${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/landing-page/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/landing-page`,
    },
    {
      title: translatation('checkoutTitle'),
      description: translatation('checkoutDescr'),
      src: `/static/images/templates/checkout${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/checkout/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/checkout`,
    },
    {
      title: translatation('signInTitle'),
      description: translatation('signInDescr'),
      src: `/static/images/templates/sign-in${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/sign-in/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-in`,
    },
    {
      title: translatation('signInSideTitle'),
      description: translatation('signInSideDescr'),
      src: `/static/images/templates/sign-in-side${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/sign-in-side/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-in-side`,
    },
    {
      title: translatation('signUpTitle'),
      description: translatation('signUpDescr'),
      src: `/static/images/templates/sign-up${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/sign-up/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-up`,
    },
    {
      title: translatation('blogTitle'),
      description: translatation('blogDescr'),
      src: `/static/images/templates/blog${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/blog/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/blog`,
    },
    {
      title: translatation('stickyFooterTitle'),
      description: translatation('stickyFooterDescr'),
      src: `/static/images/templates/sticky-footer${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/sticky-footer/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sticky-footer`,
    },
  ];
}

export default function Templates() {
  const translatation = useTranslate();
  const theme = useTheme();

  return (
    <Grid container spacing={2} sx={{ py: 2 }}>
      {layouts(translatation, theme).map((layout) => (
        <Grid item xs={12} sm={6} key={layout.title}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderColor: 'divider',
            }}
          >
            <CardMedia
              component="img"
              image={layout.src}
              title={layout.title}
              sx={{
                aspectRatio: '16 / 9',
                objectPosition: 'top',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <Box sx={{ p: 2, pt: 1.5 }}>
              <Typography component="h3" variant="body1" sx={{ fontWeight: 'semiBold' }}>
                {layout.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                {layout.description}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1,
                  mt: 'auto',
                }}
              >
                <Button
                  component="a"
                  href={layout.href}
                  size="small"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  startIcon={<Visibility sx={{ mr: 0.5 }} />}
                  data-ga-event-category="material-ui-template"
                  data-ga-event-label={layout.title}
                  data-ga-event-action="preview-img"
                >
                  Live preview
                </Button>
                <Button
                  component="a"
                  href={layout.source}
                  size="small"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  startIcon={<CodeRoundedIcon sx={{ mr: 0.5 }} />}
                >
                  Source code
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

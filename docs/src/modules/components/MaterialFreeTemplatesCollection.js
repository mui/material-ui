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

const sourcePrefix = `${process.env.SOURCE_CODE_REPO}/tree/v${process.env.LIB_VERSION}`;

function layouts(translatation) {
  return [
    {
      title: translatation('dashboardTitle'),
      description: translatation('dashboardDescr'),
      href: '/material-ui/getting-started/templates/dashboard/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/dashboard`,
      hasDarkMode: true,
    },
    {
      title: translatation('landingPageTitle'),
      description: translatation('landingPageDescr'),
      href: '/material-ui/getting-started/templates/landing-page/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/landing-page`,
      hasDarkMode: true,
    },
    {
      title: translatation('checkoutTitle'),
      description: translatation('checkoutDescr'),
      href: '/material-ui/getting-started/templates/checkout/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/checkout`,
      hasDarkMode: true,
    },
    {
      title: translatation('signInTitle'),
      description: translatation('signInDescr'),
      href: '/material-ui/getting-started/templates/sign-in/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-in`,
      hasDarkMode: true,
    },
    {
      title: translatation('signInSideTitle'),
      description: translatation('signInSideDescr'),
      href: '/material-ui/getting-started/templates/sign-in-side/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-in-side`,
      hasDarkMode: true,
    },
    {
      title: translatation('signUpTitle'),
      description: translatation('signUpDescr'),
      href: '/material-ui/getting-started/templates/sign-up/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-up`,
      hasDarkMode: true,
    },
    {
      title: translatation('blogTitle'),
      description: translatation('blogDescr'),
      href: '/material-ui/getting-started/templates/blog/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/blog`,
    },
    {
      title: translatation('stickyFooterTitle'),
      description: translatation('stickyFooterDescr'),
      href: '/material-ui/getting-started/templates/sticky-footer/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sticky-footer`,
    },
  ];
}

export default function Templates() {
  const translatation = useTranslate();

  return (
    <Grid container spacing={2} sx={{ py: 2 }}>
      {layouts(translatation).map((layout) => (
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
              // The image source is generated from `pnpm template:screenshot material-ui`, do not modify the image manually.
              image={`/static/screenshots${layout.href.replace(/\/$/, '')}.jpg`}
              title={layout.title}
              sx={(theme) => ({
                aspectRatio: '16 / 9',
                objectPosition: 'top',
                borderBottom: '1px solid',
                borderColor: 'divider',
                ...theme.applyStyles('dark', {
                  content: 'var(--src)',
                }),
              })}
              style={{
                '--src': layout.hasDarkMode
                  ? `url(/static/screenshots${layout.href.replace(/\/$/, '')}-dark.jpg)`
                  : `url(/static/screenshots${layout.href.replace(/\/$/, '')}.jpg)`,
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

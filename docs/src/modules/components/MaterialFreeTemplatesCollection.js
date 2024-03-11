/* eslint-disable material-ui/no-hardcoded-labels */
import * as React from 'react';
import NextLink from 'next/link';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Visibility from '@mui/icons-material/Visibility';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import { useTranslate } from '@mui/docs/i18n';

const sourcePrefix = `${process.env.SOURCE_CODE_REPO}/tree/v${process.env.LIB_VERSION}`;

function layouts(t) {
  return [
    {
      title: t('dashboardTitle'),
      description: t('dashboardDescr'),
      src: '/static/images/templates/dashboard.png',
      href: '/material-ui/getting-started/templates/dashboard/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/dashboard`,
    },
    {
      title: t('landingPageTitle'),
      description: t('landingPageDescr'),
      src: '/static/images/templates/landing-page.png',
      href: '/material-ui/getting-started/templates/landing-page/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/landing-page`,
    },
    {
      title: t('checkoutTitle'),
      description: t('checkoutDescr'),
      src: '/static/images/templates/checkout.png',
      href: '/material-ui/getting-started/templates/checkout/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/checkout`,
    },
    {
      title: t('signInTitle'),
      description: t('signInDescr'),
      src: '/static/images/templates/sign-in.png',
      href: '/material-ui/getting-started/templates/sign-in/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-in`,
    },
    {
      title: t('signInSideTitle'),
      description: t('signInSideDescr'),
      src: '/static/images/templates/sign-in-side.png',
      href: '/material-ui/getting-started/templates/sign-in-side/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-in-side`,
    },
    {
      title: t('signUpTitle'),
      description: t('signUpDescr'),
      src: '/static/images/templates/sign-up.png',
      href: '/material-ui/getting-started/templates/sign-up/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-up`,
    },
    {
      title: t('blogTitle'),
      description: t('blogDescr'),
      src: '/static/images/templates/blog.png',
      href: '/material-ui/getting-started/templates/blog/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/blog`,
    },
    {
      title: t('stickyFooterTitle'),
      description: t('stickyFooterDescr'),
      src: '/static/images/templates/sticky-footer.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sticky-footer`,
    },
  ];
}

export default function Templates() {
  const t = useTranslate();

  return (
    <Grid container spacing={2} sx={{ py: 2 }}>
      {layouts(t).map((layout) => (
        <Grid item xs={12} sm={4} key={layout.title}>
          <Card
            variant="outlined"
            sx={{
              p: 2,
              height: '100%',
              background: 'background.paper',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardMedia
              component="img"
              image={layout.src}
              title={layout.title}
              sx={{
                width: '100%',
                aspectRatio: '16 / 9',
                objectPosition: 'top',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px',
              }}
            />
            <Typography component="h3" variant="body1" fontWeight="semiBold" mt={1}>
              {layout.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              {layout.description}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
              <Button
                component="a"
                href={layout.source}
                size="small"
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<CodeRoundedIcon sx={{ mr: 0.5 }} />}
              >
                Code
              </Button>
              <Button
                component="a"
                href={layout.source}
                size="small"
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<Visibility sx={{ mr: 0.5 }} />}
                data-ga-event-category="material-ui-template"
                data-ga-event-label={layout.title}
                data-ga-event-action="preview-img"
              >
                Preview
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

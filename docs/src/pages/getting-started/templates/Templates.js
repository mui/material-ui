import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslate } from 'docs/src/modules/utils/i18n';

function layouts(t) {
  return [
    {
      title: t('dashboardTitle'),
      description: t('dashboardDescr'),
      src: '/static/images/templates/dashboard.png',
      href: '/getting-started/templates/dashboard/',
      source:
        'https://github.com/mui-org/material-ui/tree/next/docs/src/pages/getting-started/templates/dashboard',
    },
    {
      title: t('signInTitle'),
      description: t('signInDescr'),
      src: '/static/images/templates/sign-in.png',
      href: '/getting-started/templates/sign-in/',
      source:
        'https://github.com/mui-org/material-ui/tree/next/docs/src/pages/getting-started/templates/sign-in',
    },
    {
      title: t('signInSideTitle'),
      description: t('signInSideDescr'),
      src: '/static/images/templates/sign-in-side.png',
      href: '/getting-started/templates/sign-in-side/',
      source:
        'https://github.com/mui-org/material-ui/tree/next/docs/src/pages/getting-started/templates/sign-in-side',
    },
    {
      title: t('signUpTitle'),
      description: t('signUpDescr'),
      src: '/static/images/templates/sign-up.png',
      href: '/getting-started/templates/sign-up/',
      source:
        'https://github.com/mui-org/material-ui/tree/next/docs/src/pages/getting-started/templates/sign-up',
    },
    {
      title: t('blogTitle'),
      description: t('blogDescr'),
      src: '/static/images/templates/blog.png',
      href: '/getting-started/templates/blog/',
      source:
        'https://github.com/mui-org/material-ui/tree/next/docs/src/pages/getting-started/templates/blog',
    },
    {
      title: t('checkoutTitle'),
      description: t('checkoutDescr'),
      src: '/static/images/templates/checkout.png',
      href: '/getting-started/templates/checkout/',
      source:
        'https://github.com/mui-org/material-ui/tree/next/docs/src/pages/getting-started/templates/checkout',
    },
    {
      title: t('albumTitle'),
      description: t('albumDescr'),
      src: '/static/images/templates/album.png',
      href: '/getting-started/templates/album/',
      source:
        'https://github.com/mui-org/material-ui/tree/next/docs/src/pages/getting-started/templates/album',
    },
    {
      title: t('pricingTitle'),
      description: t('pricingDescr'),
      src: '/static/images/templates/pricing.png',
      href: '/getting-started/templates/pricing/',
      source:
        'https://github.com/mui-org/material-ui/tree/next/docs/src/pages/getting-started/templates/pricing',
    },
    {
      title: t('stickyFooterTitle'),
      description: t('stickyFooterDescr'),
      src: '/static/images/templates/sticky-footer.png',
      href: '/getting-started/templates/sticky-footer/',
      source:
        'https://github.com/mui-org/material-ui/tree/next/docs/src/pages/getting-started/templates/sticky-footer',
    },
  ];
}

function Templates() {
  const t = useTranslate();

  return (
    <Grid container spacing={2}>
      {layouts(t).map((layout) => (
        <Grid item sm={6} md={4} sx={{ flexGrow: 1 }} key={layout.title}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            }}
          >
            <CardMedia
              component="a"
              href={layout.href}
              sx={{ height: 0, pt: '65%' }}
              image={layout.src}
              title={layout.title}
              rel="nofollow"
              target="_blank"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" align="left" component="h2">
                {layout.title}
              </Typography>
              <Typography component="p">{layout.description}</Typography>
            </CardContent>
            <CardActions>
              <Button component="a" href={layout.source} size="small">
                {t('sourceCode')}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Templates;

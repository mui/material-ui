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
    <Grid container spacing={2} sx={{ pt: 2, pb: 4 }}>
      {layouts(t).map((layout) => (
        <Grid item xs={12} sm={4} key={layout.title}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              background: 'background.paper',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                overflow: 'auto',
                position: 'relative',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardMedia
                component="a"
                href={layout.href}
                image={layout.src}
                title={layout.title}
                rel="nofollow"
                target="_blank"
                sx={(theme) => ({
                  height: 0,
                  pt: '65%',
                  '&:focus-visible': {
                    borderRadius: 1,
                    outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
                    outlineOffset: '-8px',
                  },
                })}
              />
              <NextLink href={layout.href} passHref legacyBehavior>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link
                  tabIndex={-1}
                  aria-hidden
                  data-ga-event-category="material-ui-template"
                  data-ga-event-label={layout.title}
                  data-ga-event-action="preview-img"
                  sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 1,
                    transition: '0.15s',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    bgcolor: alpha(theme.palette.primary[50], 0.5),
                    backdropFilter: 'blur(4px)',
                    opacity: 0,
                    '&:hover, &:focus-visible': {
                      opacity: 1,
                    },
                    ...theme.applyDarkStyles({
                      bgcolor: alpha(theme.palette.common.black, 0.8),
                    }),
                  })}
                >
                  <Visibility />
                  <Typography
                    fontWeight="bold"
                    color="text.primary"
                    sx={{ textDecorationLine: 'underline' }}
                  >
                    View live preview
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography component="h3" variant="subtitle1" fontWeight="bold" gutterBottom>
                {layout.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {layout.description}
              </Typography>
              <Button
                component="a"
                href={layout.source}
                size="small"
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<CodeRoundedIcon sx={{ mr: 0.5 }} />}
                sx={{ mt: 'auto' }}
              >
                {t('sourceCode')}
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

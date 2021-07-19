import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Steps from 'docs/src/pages/landing/Steps';
import Themes from 'docs/src/pages/landing/Themes';
import QuickWord from 'docs/src/pages/landing/QuickWord';
import Sponsors from 'docs/src/pages/landing/Sponsors';
import Users from 'docs/src/pages/landing/Users';
import Quotes from 'docs/src/pages/landing/Quotes';
import Pro from 'docs/src/pages/landing/Pro';
import AppFooter from 'docs/src/modules/components/AppFooter';
import AppFrame from 'docs/src/modules/components/AppFrame';
import Link from 'docs/src/modules/components/Link';
import Head from 'docs/src/modules/components/Head';
import loadScript from 'docs/src/modules/utils/loadScript';
import { useTranslate } from 'docs/src/modules/utils/i18n';

let dependenciesLoaded = false;

function loadDependencies() {
  if (dependenciesLoaded) {
    return;
  }

  dependenciesLoaded = true;

  loadScript('https://buttons.github.io/buttons.js', document.querySelector('head'));
  loadScript('https://platform.twitter.com/widgets.js', document.querySelector('head'));
}

const Content = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
    flexDirection: 'row',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
}));

const Title = styled(Typography)<TypographyProps & { component?: React.ElementType }>(
  ({ theme }) => ({
    marginLeft: -12,
    whiteSpace: 'nowrap',
    letterSpacing: '.7rem',
    textIndent: '.7rem',
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.only('xs')]: {
      fontSize: 28,
    },
  }),
);

const Logo = styled('img')(({ theme }) => ({
  flexShrink: 0,
  width: 120,
  height: 120,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(8),
    width: 195,
    height: 175,
  },
}));

const Social = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 20,
  boxSizing: 'content-box',
  '& a': {
    color: theme.palette.background.paper,
  },
}));

export default function LandingPage() {
  React.useEffect(() => {
    loadDependencies();
  }, []);
  const t = useTranslate();

  return (
    <AppFrame>
      <Box sx={{ flex: '1 0 100%' }}>
        <Head />
        <main id="main-content" tabIndex={-1}>
          <Box sx={{ pt: 8, color: 'primary.main' }}>
            <Content maxWidth="md">
              <Logo src="/static/logo_raw.svg" alt="" />
              <div>
                <Title variant="h3" component="h1" color="inherit" gutterBottom>
                  {'MATERIAL-UI'}
                </Title>
                <Typography variant="h5" component="p" color="inherit">
                  {t('strapline')}
                </Typography>
                <Button
                  component={Link}
                  noLinkStyle
                  href="/getting-started/installation"
                  sx={{ mt: 4 }}
                  variant="outlined"
                >
                  {t('getStarted')}
                </Button>
              </div>
            </Content>
          </Box>
          <Social>
            <Box
              sx={{
                width: 105,
                display: 'flex',
                justifyContent: 'flex-end',
                mr: 1,
                '& span': { display: 'flex' },
              }}
            >
              <a
                className="github-button"
                href="https://github.com/mui-org/material-ui"
                data-icon="octicon-star"
                data-show-count="true"
              >
                Star
              </a>
            </Box>
            <Box sx={{ width: 160, display: 'flex' }}>
              <a
                className="twitter-follow-button"
                href="https://twitter.com/@materialui"
                data-show-screen-name="false"
              >
                Follow
              </a>
            </Box>
          </Social>
          <Pro />
          <QuickWord />
          <Steps />
          <Themes />
          <Sponsors />
          <Quotes />
          <Users />
        </main>
        <AppFooter />
      </Box>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Material-UI",
  "url": "https://material-ui.com/",
  "logo": "https://material-ui.com/static/logo.png",
  "sameAs": [
    "https://twitter.com/materialUI",
    "https://github.com/mui-org/material-ui",
    "https://opencollective.com/material-ui"
  ]
}
          `,
        }}
      />
    </AppFrame>
  );
}

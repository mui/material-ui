import * as React from 'react';
import Interpolate from '@trendmicro/react-interpolate';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from 'docs/src/modules/components/Link';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import { styled } from '@material-ui/core/styles';
import BrandingLogo from 'docs/src/modules/branding/BrandingLogo';
import BrandingNewsletter from 'docs/src/modules/branding/BrandingNewsletter';
import t1 from 'docs/src/modules/branding/t1';

const FooterRoot = styled('footer')(({ theme }) => ({
  '& .BrandingFooter-list': {
    marginBottom: theme.spacing(4),
    '& h3': {
      fontWeight: theme.typography.fontWeightBold,
      paddingBottom: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.spacing(2),
      },
    },
    '& ul': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      marginBottom: theme.spacing(3),
    },
    '& li': {
      padding: theme.spacing(0.5, 0),
    },
  },
}));

export default function BrandingFooter() {
  const userLanguage = useUserLanguage();
  const languagePrefix = userLanguage === 'en' ? '' : `/${userLanguage}`;
  const t = useTranslate();

  return (
    <FooterRoot sx={{ pt: { xs: 5, sm: 15, md: 12 }, pb: { xs: 2, sm: 7, md: 9 } }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <BrandingLogo sx={{ mb: 5 }} />
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={9}>
            <Grid container>
              <Grid item xs={6} sm={6} md={4} lg={3} className="BrandingFooter-list">
                <Typography component="h3">{t1('Products')}</Typography>
                <ul>
                  <li>
                    <Link color="inherit" underline="hover" variant="body2" href="/">
                      Material-UI
                    </Link>
                  </li>
                  <li>
                    <Link color="inherit" underline="hover" variant="body2" href="/branding/x/">
                      Material-UI X
                    </Link>
                  </li>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="/branding/pricing/"
                    >
                      {t1('Pricing')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="https://material-ui.com/store/"
                    >
                      {t1('Store')}
                    </Link>
                  </li>
                </ul>
                <Typography component="h3">{t('footerCommunity')}</Typography>
                <ul>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="https://github.com/mui-org/material-ui"
                    >
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="https://twitter.com/MaterialUI"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="https://stackoverflow.com/questions/tagged/material-ui"
                    >
                      StackOverflow
                    </Link>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={3} className="BrandingFooter-list">
                <Typography component="h3">{t1('Library')}</Typography>
                <ul>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="/getting-started/templates/"
                    >
                      {t1('Free templates')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="/components/material-icons/"
                    >
                      {t1('Material Icons')}
                    </Link>
                  </li>
                  <li>
                    <Link color="inherit" underline="hover" variant="body2" href="/components/box/">
                      {t1('Components')}
                    </Link>
                  </li>
                  <li>
                    <Link color="inherit" underline="hover" variant="body2" href="/api/accordion/">
                      {t1('Components API')}
                    </Link>
                  </li>
                  <li>
                    <Link color="inherit" underline="hover" variant="body2" href="/system/basics/">
                      {t1('System')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="/customization/theming/"
                    >
                      {t1('Customization')}
                    </Link>
                  </li>
                  <li>
                    <Link color="inherit" underline="hover" variant="body2" href="/guides/api/">
                      {t1('How To Guides')}
                    </Link>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={6} sm={12} md={4} lg={2} className="BrandingFooter-list">
                <Typography component="h3">{t1('Explore')}</Typography>
                <ul>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="/getting-started/installation/"
                    >
                      {t1('Docs')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="https://medium.com/material-ui"
                    >
                      {t1('Blog')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="/discover-more/showcase/"
                    >
                      {t1('Showcase')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="/discover-more/related-projects/"
                    >
                      {t1('Related Projects')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="/discover-more/roadmap/"
                    >
                      {t1('Roadmap')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="/discover-more/languages/"
                    >
                      {t1('Languages')}
                    </Link>
                  </li>
                </ul>
                <Typography component="h3">{t('footerCompany')}</Typography>
                <ul>
                  <li>
                    <Link color="inherit" underline="hover" variant="body2" href="/company/about/">
                      {t1('About')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      color="inherit"
                      underline="hover"
                      variant="body2"
                      href="/company/contact/"
                    >
                      {t1('Contact Us')}
                    </Link>
                  </li>
                  <li>
                    <Link color="inherit" underline="hover" variant="body2" href="/company/jobs/">
                      {t1('Jobs')}
                    </Link>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12} lg={4} className="BrandingFooter-list">
                <BrandingNewsletter />
                <Typography
                  sx={{ mt: 1, mb: 3 }}
                  color="text.secondary"
                  variant="body3"
                  component="div"
                >
                  {t1("We don't spam.")}
                </Typography>
                <IconButton
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/mui-org/material-ui"
                  aria-label="github"
                  title="GitHub"
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  target="_blank"
                  rel="noopener"
                  href="https://twitter.com/MaterialUI"
                  aria-label="twitter"
                  title="Twitter"
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  target="_blank"
                  rel="noopener"
                  href="https://www.linkedin.com/company/material-ui/"
                  aria-label="linkedin"
                  title="LinkedIn"
                >
                  <LinkedInIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography sx={{ mt: { xs: 4, sm: 5, md: 4 } }} color="text.secondary" variant="body3">
          <Interpolate
            replacement={{
              versionNumber: (
                <Link
                  color="text.primary"
                  underline="hover"
                  href={`https://material-ui.com${languagePrefix}/versions/`}
                  aria-label={`v${process.env.LIB_VERSION}. View versions page.`}
                >
                  {`v${process.env.LIB_VERSION}`}
                </Link>
              ),
              license: (
                <Link
                  color="text.primary"
                  underline="hover"
                  href={`https://github.com/mui-org/material-ui/blob/v${process.env.LIB_VERSION}/LICENSE`}
                >
                  {t('license')}
                </Link>
              ),
            }}
          >
            {t('homeFooterRelease')}
          </Interpolate>
          {' Copyright © '}
          {new Date().getFullYear()}
          {' Material-UI. '}
        </Typography>
      </Container>
    </FooterRoot>
  );
}

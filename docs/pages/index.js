import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Steps from 'docs/src/pages/landing/Steps';
import Themes from 'docs/src/pages/landing/Themes';
import QuickWord from 'docs/src/pages/landing/QuickWord';
import Sponsors, {
  getInitialProps as getInitialSponsorsProps,
} from 'docs/src/pages/landing/Sponsors';
import Users from 'docs/src/pages/landing/Users';
import Quotes from 'docs/src/pages/landing/Quotes';
import Pro from 'docs/src/pages/landing/Pro';
import AppFooter from 'docs/src/modules/components/AppFooter';
import AppFrame from 'docs/src/modules/components/AppFrame';
import Link from 'docs/src/modules/components/Link';
import Head from 'docs/src/modules/components/Head';
import loadScript from 'docs/src/modules/utils/loadScript';

let dependenciesLoaded = false;

function loadDependencies() {
  if (dependenciesLoaded) {
    return;
  }

  dependenciesLoaded = true;

  loadScript('https://buttons.github.io/buttons.js', document.querySelector('head'));
  loadScript('https://platform.twitter.com/widgets.js', document.querySelector('head'));
}

const useStyles = makeStyles(
  (theme) => ({
    root: {
      flex: '1 0 100%',
    },
    hero: {
      paddingTop: theme.spacing(8),
      color: theme.palette.primary.main,
    },
    content: {
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
    },
    title: {
      marginLeft: -12,
      whiteSpace: 'nowrap',
      letterSpacing: '.7rem',
      textIndent: '.7rem',
      fontWeight: theme.typography.fontWeightLight,
      [theme.breakpoints.only('xs')]: {
        fontSize: 28,
      },
    },
    logo: {
      flexShrink: 0,
      width: 120,
      height: 120,
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(8),
        width: 195,
        height: 175,
      },
    },
    button: {
      marginTop: theme.spacing(4),
    },
    social: {
      padding: theme.spacing(2, 0),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 21,
      boxSizing: 'content-box',
      '& a': {
        color: theme.palette.background.paper,
      },
    },
    github: {
      width: 105,
      display: 'flex',
      justifyContent: 'flex-end',
      marginRight: theme.spacing(1),
      '& span': {
        display: 'flex',
      },
    },
    twitter: {
      width: 160,
      display: 'flex',
    },
  }),
  { name: 'LandingPage' },
);

const GettingStartedLink = React.forwardRef((props, ref) => {
  return <Link href="/getting-started/installation" naked ref={ref} {...props} />;
});

export default function LandingPage(props) {
  const { sponsorsProps } = props;

  React.useEffect(() => {
    loadDependencies();
  }, []);
  const t = useSelector((state) => state.options.t);
  const classes = useStyles();

  return (
    <AppFrame>
      <div className={classes.root}>
        <Head />
        <main id="main-content" tabIndex="-1">
          <div className={classes.hero}>
            <Container maxWidth="md" className={classes.content}>
              <img src="/static/logo_raw.svg" alt="" className={classes.logo} />
              <div>
                <Typography
                  variant="h3"
                  component="h1"
                  color="inherit"
                  gutterBottom
                  className={classes.title}
                >
                  {'MATERIAL-UI'}
                </Typography>
                <Typography variant="h5" component="p" color="inherit">
                  {t('strapline')}
                </Typography>
                <Button
                  component={GettingStartedLink}
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                >
                  {t('getStarted')}
                </Button>
              </div>
            </Container>
          </div>
          <div className={classes.social}>
            <div className={classes.github}>
              <a
                className="github-button"
                href="https://github.com/mui-org/material-ui"
                data-icon="octicon-star"
                data-show-count="true"
              >
                Star
              </a>
            </div>
            <div className={classes.twitter}>
              <a
                className="twitter-follow-button"
                href="https://twitter.com/@materialui"
                data-show-screen-name="false"
              >
                Follow
              </a>
            </div>
          </div>
          <Pro />
          <QuickWord />
          <Steps />
          <Themes />
          <Sponsors {...sponsorsProps} />
          <Quotes />
          <Users />
        </main>
        <AppFooter />
      </div>
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

LandingPage.propTypes = {
  sponsorsProps: PropTypes.object.isRequired,
};

LandingPage.getInitialProps = async () => {
  return {
    sponsorsProps: await getInitialSponsorsProps(),
  };
};

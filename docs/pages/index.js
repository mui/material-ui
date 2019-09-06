import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import HomeSteps from 'docs/src/modules/components/HomeSteps';
import HomeQuickWord from 'docs/src/modules/components/HomeQuickWord';
import HomeBackers from 'docs/src/modules/components/HomeBackers';
import HomeUsers from 'docs/src/modules/components/HomeUsers';
import HomePro from 'docs/src/modules/components/HomePro';
import HomeFooter from 'docs/src/modules/components/HomeFooter';
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

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 0 100%',
  },
  drawer: {
    width: 0,
  },
  hero: {
    paddingTop: 64,
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
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
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
      width: 220,
      height: 200,
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
    '& span': {
      display: 'flex',
      marginRight: theme.spacing(1),
    },
    '& a': {
      color: theme.palette.background.paper,
    },
  },
}));

const GettingStartedLink = React.forwardRef((props, ref) => {
  return <Link href="/getting-started/installation" naked prefetch ref={ref} {...props} />;
});

export default function HomePage() {
  React.useEffect(() => {
    if (window.location.hash !== '' && window.location.hash !== '#main=content') {
      window.location.replace(`https://v0.material-ui.com/${window.location.hash}`);
    }

    loadDependencies();
  }, []);
  const t = useSelector(state => state.options.t);
  const classes = useStyles();

  return (
    <AppFrame classes={{ drawer: classes.drawer }}>
      <div className={classes.root}>
        <Head />
        <main id="main-content" tabIndex="-1">
          <div className={classes.hero}>
            <Container maxWidth="md" className={classes.content}>
              <img
                src="/static/images/material-ui-logo.svg"
                alt="Material-UI Logo"
                className={classes.logo}
              />
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
                <Typography variant="h5" component="h2" color="inherit">
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
            <a
              className="github-button"
              href="https://github.com/mui-org/material-ui"
              data-icon="octicon-star"
              data-show-count="true"
            >
              Star
            </a>
            <a
              className="twitter-follow-button"
              href="https://twitter.com/@materialui"
              data-show-screen-name="false"
            >
              Follow
            </a>
          </div>
          <HomePro />
          <HomeQuickWord />
          <HomeSteps />
          <HomeBackers />
          <HomeUsers />
        </main>
        <HomeFooter />
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
  "logo": "https://material-ui.com/static/brand.png",
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

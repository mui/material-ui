import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withRoot from 'docs/src/modules/components/withRoot';
import HomeSteps from 'docs/src/modules/components/HomeSteps';
import HomeBackers from 'docs/src/modules/components/HomeBackers';
import HomeFooter from 'docs/src/modules/components/HomeFooter';
import Link from 'docs/src/modules/components/Link';

const styles = theme => ({
  root: {
    flex: '1 0 100%',
  },
  hero: {
    minHeight: '80vh',
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.type === 'light' ? theme.palette.primary.dark : theme.palette.primary.main,
  },
  title: {
    letterSpacing: '.7rem',
    textIndent: '.7rem',
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 34,
    },
  },
  headline: {
    marginTop: theme.spacing.unit,
    maxWidth: 500,
    textAlign: 'center',
  },
  content: {
    paddingBottom: theme.spacing.unit * 8,
    paddingTop: theme.spacing.unit * 8,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 12,
    },
  },
  text: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
  },
  logo: {
    margin: '20px 0',
    width: '100%',
    height: '35vw',
    maxHeight: 200,
  },
  steps: {
    maxWidth: theme.spacing.unit * 130,
    margin: 'auto',
  },
  step: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  },
  stepIcon: {
    marginBottom: theme.spacing.unit,
  },
  markdownElement: {},
});

class HomePage extends React.Component {
  componentDidMount() {
    if (window.location.hash !== '') {
      window.location.replace(`https://v0.material-ui.com/${window.location.hash}`);
    }
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <Head>
          <title>Material-UI</title>
        </Head>
        <div className={classes.hero}>
          <div className={classes.content}>
            <img
              src="/static/images/material-ui-logo.svg"
              alt="Material-UI Logo"
              className={classes.logo}
            />
            <div className={classes.text}>
              <Typography
                variant="display2"
                align="center"
                component="h1"
                color="inherit"
                gutterBottom
                className={classes.title}
              >
                {'MATERIAL‑UI'}
              </Typography>
              <Typography
                variant="headline"
                component="h2"
                color="inherit"
                gutterBottom
                className={classes.headline}
              >
                {"React components that implement Google's Material Design."}
              </Typography>
              <Button
                component={buttonProps => (
                  <Link
                    variant="button"
                    prefetch
                    href="/getting-started/installation"
                    {...buttonProps}
                  />
                )}
                className={classes.button}
                variant="outlined"
                color="primary"
              >
                {'Get Started'}
              </Button>
            </div>
          </div>
        </div>
        <HomeSteps />
        <HomeBackers />
        <HomeFooter />
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withRoot, withStyles(styles))(HomePage);

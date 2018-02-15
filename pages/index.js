import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Head from 'next/head';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import withRoot from 'docs/src/modules/components/withRoot';
import AppFooter from 'docs/src/modules/components/AppFooter';
import NoSSR from 'docs/src/modules/components/NoSSR';
import Link from 'docs/src/modules/components/Link';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';

const styles = theme => ({
  root: {
    flex: '1 0 100%',
  },
  hero: {
    minHeight: '95vh',
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  content: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 12,
      paddingBottom: theme.spacing.unit * 10,
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
  headline: {
    maxWidth: 500,
    textAlign: 'center',
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
  backers: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'center',
    minHeight: 600,
  },
  backersBody: {
    maxWidth: theme.spacing.unit * 90,
  },
});

function PageHome(props) {
  const classes = props.classes;

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
            <Typography variant="display2" component="h1" color="inherit" gutterBottom>
              {'Material-UI'}
            </Typography>
            <Typography
              variant="headline"
              component="h2"
              color="inherit"
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
              variant="raised"
            >
              {'Get Started'}
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.backers}>
        <NoSSR>
          <MarkdownElement
            className={classes.backersBody}
            text={`
<h2 style="text-align: center;">Supporting Material-UI</h2>

Material-UI is an MIT-licensed open source project.
It's an independent project with ongoing development made possible entirely
thanks to the support of these awesome [backers](/discover-more/backers).

<h3 style="text-align: center;">Gold Sponsors</h3>

Gold Sponsors are those who have pledged $500/month and more to Material-UI.

#### via [Patreon](https://www.patreon.com/oliviertassinari)

<table>
  <tbody>
    <tr>
      <td>
        <a href="https://www.creative-tim.com" rel=noopener target="_blank">
          <img width="126" src="https://avatars1.githubusercontent.com/u/20172349" alt="0">
        </a>
      </td>
    </tr>
  </tbody>
</table>

#### via [OpenCollective](https://opencollective.com/material-ui)

${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
              .map(
                num =>
                  `<a href="https://opencollective.com/material-ui/tiers/gold-sponsors/${num}/website" rel=noopener target="_blank" style="margin-right: 8px;"><img src="https://opencollective.com/material-ui/tiers/gold-sponsors/${num}/avatar.svg" alt="${num}" /></a>`,
              )
              .join('')}
`}
          />
        </NoSSR>
      </div>
      <AppFooter />
    </div>
  );
}

PageHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withRoot, withStyles(styles))(PageHome);

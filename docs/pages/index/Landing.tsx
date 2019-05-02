import React from 'react';
import Link from 'next/link';
import PageMeta from '_shared/PageMeta';
import Logo from '_shared/svgIcons/Logo';
import Code from '@material-ui/icons/Code';
import Alarm from '@material-ui/icons/Alarm';
import GitHub from '_shared/svgIcons/GithubIcon';
import Devices from '@material-ui/icons/DevicesOther';
import PatreonSponsors from '_shared/PatreonSponsors';
import { GITHUB_URL } from '_constants';
import { LandingProperty } from './LandingProperty';
import { Button, Paper, Typography, Theme, Toolbar, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles<Theme>(theme => ({
  logoContainer: {
    width: 228,
    backgroundColor: 'white',
    borderRadius: '50%',
    padding: 12,
    marginBottom: 32,
  },
  logo: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    zIndex: 50,
    overflow: 'hidden',

    '& svg': {
      position: 'relative',
      left: 17,
      top: 19,
    },
  },
  appToolbar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    padding: '160px 20px 100px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 100,
    },
  },
  landing: {
    maxWidth: 750,
  },
  landingTypography: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  buttons: {
    marginTop: 32,
    '& > *': {
      marginRight: 16,
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  leftIcon: {
    marginRight: 8,
  },
  papersContainer: {
    marginTop: 64,
    maxWidth: 1200,
  },
  paper: {
    marginBottom: 32,
  },
  main: {
    backgroundColor: theme.palette.background.default,
    marginBottom: -50,
  },
  content: {
    padding: '80px 16px 0',
    backgroundColor: theme.palette.background.default,
    minHeight: 'calc(100vh - 63px)',
    maxWidth: 1100,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    '@media(max-width: 600px)': {
      minHeight: 'calc(100vh - 55px)',
    },
  },
  sponsorHeader: {
    marginTop: '2em',
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <div>
      <PageMeta
        title="Material-UI Pickers"
        description="Accessible, customizable, delightful date & time pickers for @material-ui/core"
      />

      <Toolbar color="primary" className={classes.appToolbar}>
        <Grid container justify="space-between" className={classes.landing}>
          <Grid item container justify="center" md={4} xs={12}>
            <Paper elevation={8} className={classes.logoContainer}>
              <div className={classes.logo}>
                <Logo />
              </div>
            </Paper>
          </Grid>

          <Grid item md={7} xs={12}>
            <Typography variant="h3" className={classes.landingTypography} gutterBottom>
              Material-UI Pickers
            </Typography>

            <Typography variant="h5" className={classes.landingTypography} gutterBottom>
              Date & Time pickers, built with ❤️ for @material-ui/core
            </Typography>

            <Grid container className={classes.buttons}>
              <Link prefetch href="/getting-started/installation">
                <Button variant="contained" size="large">
                  Get Started
                </Button>
              </Link>

              <Button
                component="a"
                size="large"
                color="inherit"
                variant="outlined"
                href={GITHUB_URL}
              >
                <GitHub className={classes.leftIcon} /> GitHub
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid container wrap="wrap" justify="center" className={classes.papersContainer}>
          <Grid item className={classes.paper} md={4} sm={6} xs={12}>
            <LandingProperty
              icon={Code}
              title="Developer experience first"
              description="Be ready to out-of-box localization, accessibility, timezone management, static typing and useful API"
            />
          </Grid>

          <Grid item className={classes.paper} md={4} sm={6} xs={12}>
            <LandingProperty
              icon={Alarm}
              title="Any date management library"
              description="Designed to be zero-effort compatible with moment, date-fns, luxon and dayjs."
            />
          </Grid>

          <Grid item className={classes.paper} md={4} sm={6} xs={12}>
            <LandingProperty
              icon={Devices}
              title="Blazing fast & well animated"
              description="Following material design guidelines and provide awesome ui both for desktop and mobile experience."
            />
          </Grid>
        </Grid>
      </Toolbar>

      <div className={classes.content}>
        <Typography gutterBottom variant="h4" align="center">
          Support @material-ui/pickers
        </Typography>

        <Typography gutterBottom align="center">
          @material-ui/pickers is a MIT licensed open source project. We are intent on code quality
          and project maintain. You can support this project as a part of material-ui's{' '}
          <a href="https://opencollective.com/material-ui">open collective</a>. Or support this
          project directly via <a href="https://www.patreon.com/user?u=9897423"> Patreon </a>
        </Typography>

        <Typography align="center" className={classes.sponsorHeader} variant="h5" gutterBottom>
          Our awesome sponsors via{' '}
          <a className="link" href="https://www.patreon.com/user?u=9897423">
            patreon
          </a>{' '}
          ❤️
        </Typography>
        <PatreonSponsors />
      </div>
    </div>
  );
};

export default Landing;

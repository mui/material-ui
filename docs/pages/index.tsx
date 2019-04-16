import React from 'react';
import Link from 'next/link';
import PageMeta from '_shared/PageMeta';
import Logo from '_shared/svgIcons/Logo';
import PatreonSponsors from '_shared/PatreonSponsors';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import { Button, Paper, Typography, Theme, Toolbar } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    flex: {
      flex: 1,
    },
    logoContainer: {
      backgroundColor: 'white',
      margin: '20px 0 64px',
      borderRadius: '50%',
      padding: 12,
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
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    noShadow: {
      boxShadow: 'unset',
    },
    appToolbar: {
      backgroundColor: theme.palette.primary.main,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: theme.palette.getContrastText(theme.palette.primary.main),
      padding: '100px 20px',
      minHeight: 'calc(75vh - 55px)',
    },
    getStarted: {
      marginTop: '10px',
    },
    landingTypography: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    main: {
      backgroundColor: theme.palette.background.default,
      marginBottom: -50,
    },
    content: {
      paddingTop: '80px',
      backgroundColor: theme.palette.background.default,
      minHeight: 'calc(100vh - 63px)',
      maxWidth: 900,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      '@media(max-width: 600px)': {
        minHeight: 'calc(100vh - 55px)',
      },
    },
    changeOutside: {
      maxWidth: 200,
      margin: '0 auto',
    },
    sponsorHeader: {
      marginTop: '2em',
    },
  });

const Landing: React.SFC<WithStyles<typeof styles>> = ({ classes }) => {
  return (
    <div>
      <PageMeta
        title="Material-UI Pickers"
        description="Accessible, customizable, delightful date & time pickers for @material-ui/core"
      />

      <Toolbar color="primary" className={classes.appToolbar}>
        <Paper elevation={8} className={classes.logoContainer}>
          <div className={classes.logo}>
            <Logo />
          </div>
        </Paper>

        <Typography variant="h4" align="center" className={classes.landingTypography} gutterBottom>
          Material-UI Pickers
        </Typography>

        <Typography variant="h5" align="center" className={classes.landingTypography} gutterBottom>
          Accessible, customizable, delightful date & time pickers for @material-ui/core
        </Typography>

        <Link prefetch href="/getting-started/installation">
          <Button variant="contained" size="large" className={classes.getStarted}>
            Get Started
          </Button>
        </Link>
      </Toolbar>

      <div id="content" className={classes.content}>
        <Typography variant="h4" align="center" gutterBottom>
          Support material-ui-pickers
        </Typography>

        <Typography align="center" gutterBottom>
          Material-UI-pickers is a MIT licensed open source project. We are intent on code quality
          and project maintain. Entirely thanks to our awesome bakers.
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

export default withStyles(styles)(Landing);

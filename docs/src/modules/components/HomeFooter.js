import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Interpolate from '@trendmicro/react-interpolate';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Link from 'docs/src/modules/components/Link';

const styles = theme => ({
  footer: {
    padding: theme.spacing(3, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8, 0),
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    '& img': {
      width: 28,
      height: 28,
      marginRight: theme.spacing(1.5),
    },
  },
  list: {
    marginBottom: theme.spacing(4),
    '& h3': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& ul': {
      margin: 0,
      paddingLeft: 0,
      listStyle: 'none',
    },
    '& li': {
      padding: '6px 0',
      color: theme.palette.text.secondary,
    },
  },
  version: {
    marginTop: theme.spacing(3),
  },
});

function HomeFooter(props) {
  const { classes } = props;
  const t = useSelector(state => state.options.t);

  return (
    <React.Fragment>
      <Divider />
      <Container maxWidth="md">
        <footer className={classes.footer}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <div className={classes.logo}>
                <img src="/static/images/material-ui-logo.svg" alt="Material-UI Logo" />
                <Typography color="primary">Material-UI</Typography>
              </div>
            </Grid>
            <Grid item xs={6} md={3} className={classes.list}>
              <Typography component="h3" gutterBottom>
                {t('footerCommunity')}
              </Typography>
              <ul>
                <li>
                  <Link
                    color="inherit"
                    variant="body2"
                    href="https://github.com/mui-org/material-ui"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link color="inherit" variant="body2" href="https://twitter.com/MaterialUI">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    color="inherit"
                    variant="body2"
                    href="https://stackoverflow.com/questions/tagged/material-ui"
                  >
                    StackOverflow
                  </Link>
                </li>
                <li>
                  <Link color="inherit" variant="body2" href="/discover-more/team/">
                    {t('pages./discover-more/team')}
                  </Link>
                </li>
                <li>
                  <Link color="inherit" variant="body2" href="https://spectrum.chat/material-ui">
                    Spectrum
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={6} md={3} className={classes.list}>
              <Typography component="h3" gutterBottom>
                {t('footerResources')}
              </Typography>
              <ul>
                <li>
                  <Link color="inherit" variant="body2" href="/getting-started/support/">
                    {t('pages./getting-started/support')}
                  </Link>
                </li>
                <li>
                  <Link color="inherit" variant="body2" href="https://medium.com/material-ui/">
                    {t('blogTitle')}
                  </Link>
                </li>
                <li>
                  <Link color="inherit" variant="body2" href="/components/material-icons/">
                    {t('pages./components/material-icons')}
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={6} md={3}>
              <ul className={classes.list} />
            </Grid>
          </Grid>
          <Typography className={classes.version} color="textSecondary" variant="body2">
            <Interpolate
              replacement={{
                versionNumber: (
                  <Link color="inherit" href="/versions/">
                    {`v${process.env.LIB_VERSION}`}
                  </Link>
                ),
                license: (
                  <Link
                    color="inherit"
                    href="https://github.com/mui-org/material-ui/blob/master/LICENSE"
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
        </footer>
      </Container>
    </React.Fragment>
  );
}

HomeFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeFooter);

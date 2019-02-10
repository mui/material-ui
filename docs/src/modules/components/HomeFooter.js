import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Interpolate from '@trendmicro/react-interpolate';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'docs/src/modules/components/Link';
import compose from 'docs/src/modules/utils/compose';

const styles = theme => ({
  root: {
    maxWidth: theme.spacing(110),
    margin: 'auto',
    padding: theme.spacing(3, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 2),
    },
  },
  list: {
    margin: 0,
    paddingLeft: 0,
    listStyle: 'none',
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  version: {
    marginTop: theme.spacing(1),
  },
});

function HomeFooter(props) {
  const { classes, t } = props;

  return (
    <footer className={classes.root}>
      <Typography variant="h6" gutterBottom>
        {t('quickLinks')}
      </Typography>
      <Typography variant="subtitle1" component="div">
        <Grid container>
          <Grid item xs={12} sm={6}>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link color="inherit" href="https://github.com/mui-org/material-ui">
                  GitHub
                </Link>
              </li>
              <li className={classes.listItem}>
                <Link color="inherit" href="https://twitter.com/MaterialUI">
                  Twitter
                </Link>
              </li>
              <li className={classes.listItem}>
                <Link
                  color="inherit"
                  href="https://github.com/mui-org/material-ui/tree/next/examples"
                >
                  {t('examples')}
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link color="inherit" href="/style/icons">
                  {t('icons')}
                </Link>
              </li>
              <li className={classes.listItem}>
                <Link color="inherit" href="/style/color">
                  {t('color')}
                </Link>
              </li>
              <li className={classes.listItem}>
                <Link color="inherit" href="/discover-more/team">
                  {t('team')}
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Typography>
      <Typography className={classes.version}>
        <Interpolate
          replacement={{
            versionNumber: `v${process.env.LIB_VERSION}`,
            license: (
              <Link color="inherit" href="https://github.com/mui-org/material-ui/blob/next/LICENSE">
                {t('license')}
              </Link>
            ),
          }}
        >
          {t('homeFooterRelease')}
        </Interpolate>
      </Typography>
    </footer>
  );
}

HomeFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({ t: state.options.t })),
  withStyles(styles),
)(HomeFooter);

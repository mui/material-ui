import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Interpolate from '@trendmicro/react-interpolate';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from 'docs/src/modules/components/Link';
import compose from 'docs/src/modules/utils/compose';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.level0,
  },
  footer: {
    padding: theme.spacing(3, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 0),
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
    <div className={classes.root}>
      <Container maxWidth="md">
        <footer className={classes.footer}>
          <Typography variant="h6" component="h3" gutterBottom>
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
                      href="https://github.com/mui-org/material-ui/tree/master/examples"
                    >
                      {t('examples')}
                    </Link>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ul className={classes.list}>
                  <li className={classes.listItem}>
                    <Link color="inherit" href="/components/icons">
                      {t('icons')}
                    </Link>
                  </li>
                  <li className={classes.listItem}>
                    <Link color="inherit" href="/customization/color">
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
          </Typography>
        </footer>
      </Container>
    </div>
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

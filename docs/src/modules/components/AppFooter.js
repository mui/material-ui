import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Link from 'docs/src/modules/components/Link';

const styleSheet = theme => ({
  root: {
    overflow: 'auto',
  },
  layout: {
    padding: theme.spacing.unit * 6,
  },
  list: {
    margin: 0,
    paddingLeft: 0,
    listStyle: 'none',
  },
  listItem: {
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
  },
});

function AppFooter(props) {
  const { classes } = props;

  return (
    <footer className={classes.root}>
      <div className={classes.layout}>
        <Typography variant="title" gutterBottom>
          Quick Links
        </Typography>
        <Typography variant="subheading" component="div">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <Link href="https://github.com/mui-org/material-ui">GitHub</Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="https://twitter.com/MaterialUI">Twitter</Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="https://github.com/mui-org/material-ui/tree/v1-beta/examples">
                    Examples
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <Link href="/discover-more/community">Community</Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="/discover-more/roadmap">Roadmap</Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="/discover-more/team">Team</Link>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Typography>
      </div>
    </footer>
  );
}

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(AppFooter);

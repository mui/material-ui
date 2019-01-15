import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'docs/src/modules/components/Link';

const styleSheet = theme => ({
  root: {
    maxWidth: theme.spacing.unit * 110,
    margin: 'auto',
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px`,
    },
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
  version: {
    marginTop: theme.spacing.unit,
  },
});

function HomeFooter(props) {
  const { classes } = props;

  return (
    <footer className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Quick Links
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
                  Examples
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link color="inherit" href="/style/icons">
                  Icons
                </Link>
              </li>
              <li className={classes.listItem}>
                <Link color="inherit" href="/style/color">
                  Color
                </Link>
              </li>
              <li className={classes.listItem}>
                <Link color="inherit" href="/discover-more/team">
                  Team
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Typography>
      <Typography className={classes.version}>
        {`Currently v${process.env.LIB_VERSION}. Released under the `}
        <Link color="inherit" href="https://github.com/mui-org/material-ui/blob/master/LICENSE">
          MIT License
        </Link>
        {'.'}
      </Typography>
    </footer>
  );
}

HomeFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(HomeFooter);

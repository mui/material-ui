// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Link from 'react-router/lib/Link';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import muiLogo from 'docs/src/assets/images/material-ui-logo.svg';

const styleSheet = createStyleSheet(theme => ({
  root: {
    flex: '1 0 100%',
  },
  hero: {
    minHeight: '100vh', // Makes the hero full height until we get some more content.
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.primary[500] : theme.palette.primary[800],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
  content: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 16,
      paddingBottom: theme.spacing.unit * 16,
    },
  },
  text: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
  button: {
    marginTop: 20,
  },
  logo: {
    margin: '20px 0',
    width: '100%',
    height: '40vw',
    maxHeight: 230,
  },
}));

function Home(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <div className={classes.hero}>
        <div className={classes.content}>
          <img src={muiLogo} alt="Material-UI Logo" className={classes.logo} />
          <div className={classes.text}>
            <Typography type="display2" component="h1" color="inherit">
              {'Material-UI'}
            </Typography>
            <Typography type="subheading" component="h2" color="inherit">
              {"A React component library implementing Google's Material Design"}
            </Typography>
            <Button
              component={Link}
              className={classes.button}
              raised
              to="/getting-started/installation"
            >
              {'Get Started'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Home);

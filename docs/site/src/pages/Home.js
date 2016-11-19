// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Link from 'react-router/lib/Link';
import Text from 'material-ui/Text';
import Button from 'material-ui/Button';
import muiLogo from 'docs/site/assets/images/material-ui-logo.svg';

export const styleSheet = createStyleSheet('Home', (theme) => {
  const { palette, breakpoints } = theme;

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 0 100%',
    },
    hero: {
      minHeight: '100%', // Makes the hero full height until we get some more content.
      flex: '0 0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: palette.primary[500],
      color: palette.getContrastText(palette.primary[500]),
    },
    content: {
      padding: '60px 30px',
      textAlign: 'center',
      [breakpoints.up('sm')]: {
        padding: '120px 30px',
      },
    },
    button: {
      marginTop: 20,
    },
    logo: {
      margin: '20px -40%',
      width: '100%',
      height: '40vw',
      maxHeight: 230,
    },
  };
});

function Home(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div className={classes.root}>
      <div className={classes.hero}>
        <div className={classes.content}>
          <img src={muiLogo} alt="Material UI Logo" className={classes.logo} />
          <Text type="display2" component="h1">
            {'Material-UI'}
          </Text>
          <Text type="subheading" component="h2">
            {"A React component library implementing Google's Material Design"}
          </Text>
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
  );
}

Home.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

export default Home;

import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import Text from 'material-ui/Text';
import Button from 'material-ui/Button';

import muiLogo from '../../assets/images/material-ui-logo.svg';

export const styleSheet = createStyleSheet('Home', (theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 0 100%',
    },
    hero: {
      flex: '1 0 100%',
      paddingTop: 64,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.primary[400],
      color: theme.palette.getContrastText(theme.palette.primary[400]),
    },
    content: {
      textAlign: 'center',
    },
    button: {
      marginTop: 20,
    },
    logo: {
      margin: '20px 0',
    },
  };
});

export default class Home extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div className={classes.root}>
        <div className={classes.hero}>
          <div className={classes.content}>
            <img src={muiLogo} alt="Material UI Logo" className={classes.logo} />
            <Text type="display3">Material-UI</Text>
            <Text type="headline">
              A React component library implementing Google's Material Design
            </Text>
            <Button className={classes.button} raised={true}>Get Started</Button>
          </div>
        </div>
      </div>
    );
  }
}

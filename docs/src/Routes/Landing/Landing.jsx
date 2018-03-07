import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Typography, withStyles, Button } from 'material-ui';

class Demo extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    toggleThemeType: PropTypes.func.isRequired,
    toggleDirection: PropTypes.func.isRequired,
    toggleFrench: PropTypes.func.isRequired,
  }

  scrollToContent = () => {
    const contentEl = document.getElementById('content');
    contentEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Toolbar color="primary" className={classes.appToolbar}>
          <img alt="Material-UI logo" className="material-ui-logo" src="https://material-ui-1dab0.firebaseapp.com/static/images/material-ui-logo.svg" />

          <Typography variant="display1" color="inherit" className="title text-light" gutterBottom>
            Material-UI Pickers
          </Typography>
          <Typography variant="headline" align="center" color="inherit" gutterBottom className="text-light">
            Date and Time pickers for material-ui v1
          </Typography>

          <Button variant="raised" className={classes.getStarted} onClick={this.scrollToContent}>
            Get Started
          </Button>
        </Toolbar>

        <div id="content" className={classes.content}>
          <Typography variant="display2" align="center" gutterBottom>
            Here you are!
          </Typography>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  flex: {
    flex: 1,
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
    color: theme.palette.common.white,
    padding: '40px 20px',
    '@media (max-width: 600px)': {
      paddingTop: '100px',
      minHeight: 'calc(100vh - 55px)',
    },
  },
  getStarted: {
    marginTop: '10px',
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
});

export default withStyles(styles)(Demo);

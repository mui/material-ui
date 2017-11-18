import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography, withStyles, Button, Tooltip } from 'material-ui';

import Github from './components/GithubIcon';
import SourcablePanel from './components/SourcablePanel';
import BasicUsage from './Examples/BasicUsage';
import CustomElements from './Examples/CustomElements';
import DateTimePickers from './Examples/DateTimePickers';
import './Demo.css';

class Demo extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    toggleThemeType: PropTypes.func.isRequired,
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
    const { classes, toggleThemeType, toggleFrench } = this.props;
    return (
      <main className={classes.main}>
        <AppBar position="fixed" className={classes.noShadow}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
              menu
            </IconButton>

            <div className={classes.flex} />

            <Tooltip title="Toggle English/French moment locale" enterDelay={300}>
              <IconButton color="contrast" onClick={toggleFrench}>
                language
              </IconButton>
            </Tooltip>

            <Tooltip title="Toggle light/dark theme" enterDelay={300}>
              <IconButton color="contrast" onClick={toggleThemeType}>
                lightbulb_outline
              </IconButton>
            </Tooltip>

            <a href="https://github.com/dmtrKovalenko/material-ui-pickers">
              <IconButton>
                <Github color="white" />
              </IconButton>
            </a>
          </Toolbar>
        </AppBar>

        <Toolbar color="primary" className={classes.appToolbar}>
          <img alt="Material-UI logo" className="material-ui-logo" src="https://material-ui-1dab0.firebaseapp.com/static/images/material-ui-logo.svg" />

          <Typography type="display1" color="inherit" className="title text-light" gutterBottom>
            Material-UI Pickers
          </Typography>
          <Typography type="headline" align="center" color="inherit" gutterBottom className="text-light">
            Date and Time pickers for material-ui v1
          </Typography>

          <Button raised className={classes.getStarted} onClick={this.scrollToContent}>
            Get Started
          </Button>
        </Toolbar>

        <div id="content" className={classes.content}>
          <Typography type="display2" align="center" gutterBottom>
            Here you are!
          </Typography>

          <SourcablePanel
            title="Basic Usage"
            sourceFile="BasicUsage.jsx"
          >
            <BasicUsage />
          </SourcablePanel>

          <SourcablePanel
            title="Date & Time pickers"
            sourceFile="DateTimePickers.jsx"
          >
            <DateTimePickers />
          </SourcablePanel>

          <SourcablePanel
            title="Custom Day Element"
            sourceFile="CustomElements.jsx"
          >
            <CustomElements />
          </SourcablePanel>
        </div>
      </main>
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
    backgroundColor: theme.palette.primary[500],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
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

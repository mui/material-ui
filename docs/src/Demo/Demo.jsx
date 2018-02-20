import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Icon, Typography, withStyles, Button, Tooltip } from 'material-ui';

import Github from './components/GithubIcon';
import SourcablePanel from './components/SourcablePanel';
import BasicUsage from './Examples/BasicUsage';
import CustomElements from './Examples/CustomElements';
import DateTimePickers from './Examples/DateTimePickers';
import PersianPickers from './Examples/PersianPickers';
import './Demo.css';

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
    const {
      classes, toggleThemeType, toggleDirection, toggleFrench,
    } = this.props;

    return (
      <main className={classes.main}>
        <AppBar position="fixed" className={classes.noShadow}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <Icon>menu</Icon>
            </IconButton>

            <div className={classes.flex} />

            <Tooltip title="Toggle English/French moment locale" enterDelay={300}>
              <IconButton color="inherit" onClick={toggleFrench}>
                <Icon>language</Icon>
              </IconButton>
            </Tooltip>

            <Tooltip title="Toggle light/dark theme" enterDelay={300}>
              <IconButton color="inherit" onClick={toggleThemeType}>
                <Icon>lightbulb_outline</Icon>
              </IconButton>
            </Tooltip>

            <Tooltip title="Toggle direction" enterDelay={300}>
              <IconButton color="inherit" onClick={toggleDirection}>
                <Icon>format_textdirection_l_to_r</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Github" enterDelay={300}>
              <IconButton
                color="inherit"
                component="a"
                href="https://github.com/dmtrKovalenko/material-ui-pickers"
              >
                <Github color="inherit" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

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
          {/*
          <SourcablePanel
            title="Custom Day Element"
            sourceFile="CustomElements.jsx"
          >
            <CustomElements />
          </SourcablePanel>

           <SourcablePanel
            title="Persian Pickers"
            description={
              <p key="persian-desc">
                Make sure you have read the
                <a href="https://material-ui-next.com/guides/right-to-left/"> right to left section </a>
                of the material-ui documentation page
              </p>
            }
            sourceFile="PersianPickers.jsx"
          >
            <PersianPickers />
          </SourcablePanel> */}
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

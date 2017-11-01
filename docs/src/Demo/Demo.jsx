import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { AppBar, Toolbar, IconButton, Typography, withStyles, Button, Tooltip } from 'material-ui'
import { TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers'
import Github from './GithubIcon'
import './Demo.css';
import moment from 'moment';

class Demo extends Component {
  static propTypes = {
    toggleThemeType: PropTypes.func.isRequired,
  }

  state = {
    selectedDate: new Date(),
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date })
  }

  scrollToContent = () => {
    const contentEl = document.getElementById('content');
    contentEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  render() {
    const { classes } = this.props
    const { selectedDate } = this.state

    return (
      <main className={classes.main}>
        <AppBar position="fixed" className={classes.noShadow}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
              menu
            </IconButton>

           <div className={classes.flex} />

           <Tooltip title="Toggle light/dark theme" enterDelay={300}>
            <IconButton color="contrast" onClick={this.props.toggleThemeType}>
              lightbulb_outline
            </IconButton>
           </Tooltip>
           
          <a href="https://github.com/dmtrKovalenko/material-ui-pickers">
            <IconButton> 
              <Github color="white"/> 
            </IconButton>
          </a>
          </Toolbar>
        </AppBar>

        <Toolbar color="primary" className={classes.appToolbar}>
          <img className="material-ui-logo" src="https://material-ui-1dab0.firebaseapp.com/static/images/material-ui-logo.svg" />
          
          <Typography type="display1" color="inherit" className='title text-light' gutterBottom>
            Material-UI Pickers
          </Typography>
          <Typography type="headline" align="center" color="inherit" gutterBottom className='text-light'>
            Date and Time pickers for material-ui v1
          </Typography>

          <Button raised className={classes.getStarted} onClick={this.scrollToContent}>
            Get Started
          </Button>
        </Toolbar>

        <Button onClick={() => this.setState({ selectedDate: moment('2015-02-02 12:44') })}>
         Set state
        </Button>
        <div id="content" className={classes.content}>
          <Typography type="display2" align="center" gutterBottom>
            Here you are!
          </Typography>

          <Typography type="display1" className={classes.example}>
            Basic usage
          </Typography>

          <div className={classes.pickers}>
            <div className="picker">
              <Typography type="headline" align="center" gutterBottom>
                Date picker
              </Typography>

              <DatePicker
                value={selectedDate}
                onChange={this.handleDateChange}
                animateYearScrolling={false}
              />
            </div>

            <div className="picker">
              <Typography type="headline" align="center" gutterBottom>
                Time picker
              </Typography>

              <TimePicker
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
              />
            </div>
          </div>

          <Typography type="display1" gutterBottom> 
            Date & Time pickers 
          </Typography>
          
          <div className={classes.pickers}>
            <div className="picker">
              <Typography type="headline" align="center" gutterBottom>
                Default
              </Typography>

              <DateTimePicker
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
              />
            </div>

            <div className="picker">
              <Typography type="headline" align="center" gutterBottom>
                Custom
              </Typography>

              <DateTimePicker
                showTabs={false}
                autoOk
                disableFuture
                autoSubmit={false}
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
              />
            </div>
          </div>
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
    boxShadow: 'unset'
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
  example: {
    marginTop: '40px'
  },
  main: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: -50
  },
  pickers: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    minHeight: 160,
    paddingTop: 40,
    margin: '30px auto 50px',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    paddingTop: '60px',
    backgroundColor: theme.palette.background.paper,
    minHeight: 'calc(100vh - 63px)',
    maxWidth: 900,
    margin: '0 auto',
    '@media(max-width: 600px)': {
      minHeight: 'calc(100vh - 55px)'
    }
  }
})

export default withStyles(styles)(Demo);

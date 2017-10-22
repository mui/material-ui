import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from 'material-ui'
import { TimePicker, DatePicker } from 'material-ui-pickers'
import Github from './GithubIcon'
import './Demo.css';

class Demo extends Component {
  state = {
    selectedDate: new Date(),
    selectedTime: new Date()
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date })
  }

  handleTimeChange = time => {
    this.setState({ selectedTime: time })
  }

  render() {
    const { selectedDate } = this.state
    return (
      <main className="main">
        <AppBar position="static">
          <Toolbar className="app-toolbar">
            <img className="material-ui-logo" src="https://material-ui-1dab0.firebaseapp.com/static/images/material-ui-logo.svg" />
            
            <Typography type="display1" color="inherit" className='title text-light' gutterBottom>
              Material-UI Pickers
            </Typography>
            <Typography type="headline" align="center" color="inherit" gutterBottom className='text-light'>
              Date and Time pickers for material-ui v1
            </Typography>

            <a className="github-icon" href="https://github.com/dmtrKovalenko/material-ui-pickers">
              <IconButton> 
                <Github color="white"/> 
              </IconButton>
            </a>
          </Toolbar>
        </AppBar>

        <Typography type="display1" align="center" gutterBottom>
          Here you are!
        </Typography>

        <div className="pickers">
          <div className="picker">
            <Typography type="headline" align="center" gutterBottom>
              Date picker
            </Typography>

            <DatePicker 
              disableFuture
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
              value={this.state.selectedTime}
              onChange={this.handleTimeChange}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Demo;

import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from 'material-ui'
import { TimePicker, DatePicker } from 'material-ui-pickers'
import './App.css';


class App extends Component {
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
      <div className="root">
         <AppBar position="static">
          <Toolbar>
            <IconButton className='menuButton' color="contrast" aria-label="Menu">
              menu
            </IconButton>
            <Typography type="headline" color="inherit" className='flex'>
              Material UI Pickers
            </Typography>
          </Toolbar>
        </AppBar>

        <main className="main">
          <Typography type="display2" align="center" gutterBottom>
            Here you are! Let`s test your pickers
          </Typography>

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
        </main>
      </div>
    );
  }
}

export default App;

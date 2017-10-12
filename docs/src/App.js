import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from 'material-ui'
import DateTimePicker from 'material-ui-pickers'
import './App.css';


class App extends Component {
  state = {
    selectedDate: new Date()
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date })
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

          <div className="main-picker">
            <DateTimePicker 
              disableFuture
              value={selectedDate}
              onChange={this.handleDateChange}
              animateYearScrolling={false}
            />
          </div>
        </main>
      </div>
     
    );
  }
}

export default App;

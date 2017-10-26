import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui'
import Demo from './Demo/Demo'

export default class App extends Component {
  state = {
    type: 'light'
  }

  toggleThemeType = () => {
    const type = this.state.type === 'light' ? 'dark' : 'light'

    this.setState({ type })
  }

  getMuiTheme = () => {
    return createMuiTheme({
      palette: {
        type: this.state.type, // Switching the dark mode on is a single property value change.
      },
    })
  }

  render() {
    return ( 
      <div className="root">
        <MuiThemeProvider theme={this.getMuiTheme()}>
          {<Demo toggleThemeType={this.toggleThemeType} />}
        </MuiThemeProvider>
      </div>
    )
  }
}

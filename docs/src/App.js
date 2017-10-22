import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui'
import Demo from './Demo/Demo'

export default class App extends Component {
  render() {
    return ( 
      <div className="root">
        <MuiThemeProvider>
          <Demo  />
        </MuiThemeProvider>
      </div>
    )
  }
}

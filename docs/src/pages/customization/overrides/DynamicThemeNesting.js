import React from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import blue from '@material-ui/core/colors/blue';
import Switch from '@material-ui/core/Switch';

class DynamicThemeNesting extends React.Component {
  state = {
    color: 'default',
  };

  handleChange = event => {
    this.setState({ color: event.target.checked ? 'blue' : 'default' });
  };

  render() {
    return (
      <React.Fragment>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.color === 'blue'}
              onChange={this.handleChange}
              color="primary"
              value="dynamic-class-name"
            />
          }
          label="Blue"
        />
        <MuiThemeProvider
          theme={theme =>
            this.state.color === 'blue'
              ? {
                  ...theme,
                  palette: {
                    ...theme.palette,
                    secondary: {
                      light: blue[300],
                      main: blue[500],
                      dark: blue[700],
                      contrastText: '#fff',
                    },
                  },
                }
              : theme
          }
        >
          <Button variant="raised" color="secondary">
            {'dynamic theme nesting'}
          </Button>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default DynamicThemeNesting;

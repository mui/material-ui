import React from 'react';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import blue from '@material-ui/core/colors/blue';
import Switch from '@material-ui/core/Switch';

const defaultTheme = createMuiTheme();

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
        <ThemeProvider
          theme={
            this.state.color === 'blue'
              ? {
                  ...defaultTheme,
                  palette: {
                    ...defaultTheme.palette,
                    secondary: {
                      main: blue[500],
                      contrastText: '#fff',
                    },
                  },
                }
              : defaultTheme
          }
        >
          <Button variant="contained" color="secondary">
            {'Theme nesting'}
          </Button>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default DynamicThemeNesting;

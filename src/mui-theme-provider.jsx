import {Component, PropTypes} from 'react';

class ThemeProvider extends Component {
  getChildContext() {
    return {
      muiTheme: this.props.muiTheme,
    };
  }
  render() {
    return this.props.children;
  }
}

ThemeProvider.propTypes = {
  children: PropTypes.element,
  muiTheme: PropTypes.object,
};

ThemeProvider.childContextTypes = {
  muiTheme: PropTypes.object,
};

export default ThemeProvider;

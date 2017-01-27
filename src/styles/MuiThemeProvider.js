import React, {Component, PropTypes} from 'react';
import getMuiTheme from './getMuiTheme';

class MuiThemeProvider extends Component {

  static propTypes = {
    children: PropTypes.element,
    getGlobalStyle: PropTypes.func,
    muiTheme: PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      muiTheme: this.props.muiTheme || getMuiTheme(),
    };
  }

  render() {
    const style = this.props.getGlobalStyle(this.context.muiTheme);

    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}

export default MuiThemeProvider;

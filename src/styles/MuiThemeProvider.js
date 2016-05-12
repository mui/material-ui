import {Component, PropTypes} from 'react';
import getMuiTheme from './getMuiTheme';
import getUniqueIdGenerator from '../utils/getUniqueIdGenerator';


class MuiThemeProvider extends Component {

  static propTypes = {
    children: PropTypes.element,
    muiTheme: PropTypes.object,
    uniqueIdGen: PropTypes.func,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
    uniqueIdGen: PropTypes.func.isRequired,
  };

  state = {
    uniqueIdGen: this.props.uniqueIdGen || getUniqueIdGenerator(),
  };

  getChildContext() {
    return {
      muiTheme: this.props.muiTheme || getMuiTheme(),
      uniqueIdGen: this.state.uniqueIdGen,
    };
  }

  render() {
    return this.props.children;
  }
}

export default MuiThemeProvider;

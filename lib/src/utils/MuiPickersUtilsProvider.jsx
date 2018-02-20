import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class MuiPickersUtilsProvider extends PureComponent {
  static propTypes = {
    utils: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  }

  static childContextTypes = {
    muiPickersDateUtils: PropTypes.func,
  }

  getChildContext() {
    return {
      muiPickersDateUtils: this.props.utils,
    };
  }

  render() {
    return this.props.children;
  }
}

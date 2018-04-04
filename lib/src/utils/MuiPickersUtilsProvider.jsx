import { Component } from 'react';
import PropTypes from 'prop-types';

export default class MuiPickersUtilsProvider extends Component {
  static propTypes = {
    utils: PropTypes.func.isRequired,
    locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    children: PropTypes.element.isRequired,
    moment: PropTypes.func,
  }

  static defaultProps = {
    locale: undefined,
    moment: undefined,
  }

  static childContextTypes = {
    muiPickersDateUtils: PropTypes.object,
  }

  getChildContext() {
    const { utils: Utils, locale, moment } = this.props;
    return {
      muiPickersDateUtils: new Utils({ locale, moment }),
    };
  }

  render() {
    return this.props.children;
  }
}

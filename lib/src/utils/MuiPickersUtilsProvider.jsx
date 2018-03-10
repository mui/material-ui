import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class MuiPickersUtilsProvider extends PureComponent {
  static propTypes = {
    utils: PropTypes.func.isRequired,
    locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    children: PropTypes.element.isRequired,
  }

  static defaultProps = {
    locale: undefined,
  }

  static childContextTypes = {
    muiPickersDateUtils: PropTypes.object,
  }

  getChildContext() {
    const { utils: Utils, locale } = this.props;
    return {
      muiPickersDateUtils: new Utils(locale),
    };
  }

  render() {
    return this.props.children;
  }
}

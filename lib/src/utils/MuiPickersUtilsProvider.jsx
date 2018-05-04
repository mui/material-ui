import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const { Consumer, Provider } = React.createContext();
export const MuiPickersContextConsumer = Consumer;

export default class MuiPickersUtilsProvider extends PureComponent {
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

  render() {
    const { utils: Utils, locale, moment } = this.props;
    const utils = new Utils({ locale, moment });

    return <Provider value={utils}> {this.props.children} </Provider>;
  }
}

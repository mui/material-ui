import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const { Consumer, Provider } = React.createContext();
export const MuiPickersContextConsumer = Consumer;

export default class MuiPickersUtilsProvider extends PureComponent {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    utils: PropTypes.func.isRequired,
    locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    children: PropTypes.oneOfType([
      PropTypes.element.isRequired,
      PropTypes.arrayOf(PropTypes.element.isRequired),
    ]).isRequired,
    moment: PropTypes.func,
  }

  static defaultProps = {
    locale: undefined,
    moment: undefined,
  }

  static getDerivedStateFromProps({ utils: Utils, locale, moment }) {
    return {
      utils: new Utils({ locale, moment }),
    };
  }

  state = {
    utils: null,
  }

  render() {
    return <Provider value={this.state.utils}> {this.props.children} </Provider>;
  }
}

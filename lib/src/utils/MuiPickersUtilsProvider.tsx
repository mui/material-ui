import * as React from 'react';
import * as PropTypes from 'prop-types';

const { Consumer, Provider } = React.createContext(null as any);
export const MuiPickersContextConsumer = Consumer;

export interface MuiPickersUtilsProviderProps {
  utils: any;
  children: React.ReactNode;
  locale?: any;
  moment?: any;
}

export default class MuiPickersUtilsProvider extends React.Component<MuiPickersUtilsProviderProps> {
  static propTypes = {
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

  state = {
    utils: null,
  }

  static getDerivedStateFromProps({ utils: Utils, locale, moment }: MuiPickersUtilsProviderProps) {
    return {
      utils: new Utils({ locale, moment }),
    };
  }

  render() {
    return <Provider value={this.state.utils} children={this.props.children} />;
  }
}

import { IUtils } from '@date-io/core/IUtils';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { MaterialUiPickersDate } from './typings/date';

export const MuiPickersContext = React.createContext<IUtils<MaterialUiPickersDate> | null>(null);
// TODO remove in v3.0
export const MuiPickersContextConsumer = MuiPickersContext.Consumer;

export interface MuiPickersUtilsProviderProps {
  utils: any;
  children: React.ReactNode;
  locale?: any;
  moment?: any;
}

export default class MuiPickersUtilsProvider extends React.Component<MuiPickersUtilsProviderProps> {
  public static propTypes: any = {
    utils: PropTypes.func.isRequired,
    locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    children: PropTypes.oneOfType([
      PropTypes.element.isRequired,
      PropTypes.arrayOf(PropTypes.element.isRequired),
    ]).isRequired,
    moment: PropTypes.func,
  };

  public static getDerivedStateFromProps({
    utils: Utils,
    locale,
    moment,
  }: MuiPickersUtilsProviderProps) {
    return {
      utils: new Utils({ locale, moment }),
    };
  }

  public state = {
    utils: null,
  };

  public render() {
    return <MuiPickersContext.Provider value={this.state.utils} children={this.props.children} />;
  }
}

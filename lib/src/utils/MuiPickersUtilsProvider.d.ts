import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare const MuiPickersContextConsumer: React.ComponentType<React.ConsumerProps<any>>;
export interface MuiPickersUtilsProviderProps {
    utils: any;
    children: React.ReactNode;
    locale?: any;
    moment?: any;
}
export default class MuiPickersUtilsProvider extends React.Component<MuiPickersUtilsProviderProps> {
    static propTypes: {
        utils: PropTypes.Validator<(...args: any[]) => any>;
        locale: PropTypes.Requireable<string | object>;
        children: PropTypes.Validator<PropTypes.ReactElementLike | PropTypes.ReactElementLike[]>;
        moment: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        locale: undefined;
        moment: undefined;
    };
    state: {
        utils: null;
    };
    static getDerivedStateFromProps({ utils: Utils, locale, moment }: MuiPickersUtilsProviderProps): {
        utils: any;
    };
    render(): JSX.Element;
}

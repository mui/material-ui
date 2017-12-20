import * as PropTypes from 'prop-types';

// Same value used by react-jss
export const CHANNEL = '__THEMING__';

// This is using the API from https://github.com/vesparny/brcast
// interface MuiContext {
//   getState(): object;
//   subscribe(callback: Function): Function;
// }

export interface ThemeListener {
  contextTypes: {
    // 'material-ui': object;
    [key: string]: any;
  };
  initial(context: object): object;
  subscribe(context: object, callback: Function): number;
  unsubscribe(context: object, subscriptionId: number): void;
}

const themeListener: ThemeListener = {
  contextTypes: {
    [CHANNEL]: PropTypes.object,
  },
  initial: context => {
    if (!context[CHANNEL]) {
      return null;
    }

    return context[CHANNEL].getState();
  },
  subscribe: (context, cb) => {
    if (!context[CHANNEL]) {
      return null;
    }

    return context[CHANNEL].subscribe(cb);
  },
  unsubscribe(context, subscriptionId) {
    if (context[CHANNEL]) {
      context[CHANNEL].unsubscribe(subscriptionId);
    }
  },
};

export default themeListener;

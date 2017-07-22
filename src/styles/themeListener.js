// @flow

import PropTypes from 'prop-types';

export const CHANNEL = 'material-ui';

const themeListener = {
  contextTypes: {
    [CHANNEL]: PropTypes.object,
  },
  initial: (context: Object) => {
    if (!context[CHANNEL]) {
      return null;
    }

    return context[CHANNEL].getState();
  },
  subscribe: (context: Object, cb: Function) => {
    if (!context[CHANNEL]) {
      return null;
    }

    return context[CHANNEL].subscribe(cb);
  },
};

export default themeListener;

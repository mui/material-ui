import React from 'react';
import warning from 'warning';

let hasWarned;
const warn = () => {
  warning(hasWarned, 'The \'material-ui/lib/mixins/style-propable.js\' mixin has been deprecated.' +
    ' Please do not use this mixin as it will be removed in an upcoming release.');
  hasWarned = true;
};

export const mergeStyles = (...args) => {
  warn();
  return Object.assign({}, ...args);
};

export default {

  propTypes: {
    style: React.PropTypes.object,
  },

  mergeStyles,

  prepareStyles(...args) {
    warn();
    const {
      prepareStyles = (style) => (style),
    } = (this.state && this.state.muiTheme) || (this.context && this.context.muiTheme) ||
        (this.props && this.props.muiTheme) || {};

    return prepareStyles(mergeStyles(...args));
  },

  componentWillMount() {
    warn();
  },
};

import React from 'react';
import getMuiTheme from './styles/getMuiTheme';
import merge from 'lodash.merge';

const defaultTheme = getMuiTheme();

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function muiThemeable(WrappedComponent, forwardMethods) {

  const methods = {};
  if (forwardMethods) {
    forwardMethods.map(name => methods[name] =
      (function(...args) { return this.refs.WrappedComponent[name](...args); }));
  }

  return React.createClass(merge({
    displayName: getDisplayName(WrappedComponent),

    contextTypes: {
      _muiTheme: React.PropTypes.object,
    },

    childContextTypes: {
      _muiTheme: React.PropTypes.object,
    },

    render() {
      const {_muiTheme = defaultTheme} = this.context;
      return React.createElement(WrappedComponent, {
        _muiTheme,
        ref: forwardMethods ? 'WrappedComponent' : undefined,
        ...this.props,
      });
    },
  }, methods));
}

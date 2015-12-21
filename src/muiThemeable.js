import React from 'react';
import getMuiTheme from './styles/getMuiTheme';

const defaultTheme = getMuiTheme();

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function proxy(name) {
  return function(...args) { return this.refs.WrappedComponent[name](...args); };
}

export default function muiThemeable(WrappedComponent, forwardMethods) {
  const methods = {};
  if (forwardMethods) {
    forwardMethods.forEach(name => methods[name] = proxy(name));
  }

  return React.createClass(Object.assign({
    displayName: getDisplayName(WrappedComponent),

    contextTypes: {
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

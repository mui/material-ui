import React from 'react';
import getMuiTheme from './styles/getMuiTheme';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function muiThemeable(WrappedComponent) {
  function MuiComponent(props, {_muiTheme = getMuiTheme()}) {
    return React.createElement(WrappedComponent, {_muiTheme, ...props});
  }

  MuiComponent.displayName = getDisplayName(WrappedComponent);
  MuiComponent.contextTypes = {
    _muiTheme: React.PropTypes.object,
  };
  MuiComponent.childContextTypes = {
    _muiTheme: React.PropTypes.object,
  };

  return MuiComponent;
}

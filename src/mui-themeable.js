import React from 'react';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function muiThemeable(WrappedComponent) {
  const MuiComponent = (props, {muiTheme = ThemeManager.getMuiTheme(DefaultRawTheme)}) => {
    return <WrappedComponent {...props} muiTheme={muiTheme} />;
  };

  MuiComponent.displayName = getDisplayName(WrappedComponent);
  MuiComponent.contextTypes = {
    muiTheme: React.PropTypes.object,
  };
  MuiComponent.childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  return MuiComponent;
}

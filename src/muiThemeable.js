import React from 'react';
import getMuiTheme from './styles/getMuiTheme';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function muiThemeable(WrappedComponent) {
  const MuiComponent = (props, {muiTheme = getMuiTheme()}) => {
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

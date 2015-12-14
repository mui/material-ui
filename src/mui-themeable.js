import React from 'react';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function muiThemeable(mapBaseTheme) {
  return function muiThemeable(WrappedComponent) {

    const MuiComponent = (props, {muiBaseTheme = DefaultRawTheme}) => {
      return <WrappedComponent {...props} muiTheme={mapBaseTheme(muiBaseTheme)} />;
    };

    MuiComponent.displayName = `mui(${getDisplayName(WrappedComponent)})`;
    MuiComponent.contextTypes = {
      muiTheme: React.PropTypes.object,
    };
    MuiComponent.childContextTypes = {
      muiTheme: React.PropTypes.object,
    };

    return MuiComponent;
  };
}

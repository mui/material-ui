import React from 'react';
import getMuiTheme from './styles/getMuiTheme';

let DEFAULT_THEME;

function getDefaultTheme() {
  if (!DEFAULT_THEME) {
    DEFAULT_THEME = getMuiTheme();
  }
  return DEFAULT_THEME;
}

export default function muiThemeable() {
  return (Component) => {

    const MuiComponent = (props, {muiTheme = getDefaultTheme()}) => {
      return <Component {...props} muiTheme={muiTheme} />;
    };

    MuiComponent.contextTypes = {muiTheme: React.PropTypes.object};

    return MuiComponent;
  };
}

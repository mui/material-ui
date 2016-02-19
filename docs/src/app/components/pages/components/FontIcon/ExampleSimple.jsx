import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import {blue500, red500, greenA200} from 'material-ui/lib/styles/colors';

const iconStyles = {
  marginRight: 24,
};

const FontIconExampleSimple = () => (
  <div>
    <FontIcon
      className="muidocs-icon-action-home"
      style={iconStyles}
    />

    <FontIcon
      className="muidocs-icon-action-home"
      style={iconStyles}
      color={blue500}
    />

    <FontIcon
      className="muidocs-icon-action-home"
      style={iconStyles}
      color={red500}
      hoverColor={greenA200}
    />
  </div>
);

export default FontIconExampleSimple;


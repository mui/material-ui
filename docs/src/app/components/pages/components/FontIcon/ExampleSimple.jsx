import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';

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
      color={Colors.blue500}
    />
    <FontIcon
      className="muidocs-icon-action-home"
      style={iconStyles}
      color={Colors.red500}
      hoverColor={Colors.greenA200}
    />
  </div>
);

export default FontIconExampleSimple;

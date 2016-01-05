import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';

const iconStyles = {
  marginRight: 24,
};

const FontIconExampleIcons = () => (
  <div>
    <FontIcon className="material-icons" style={iconStyles} >home</FontIcon>
    <FontIcon className="material-icons" style={iconStyles} color={Colors.red500}>flight_takeoff</FontIcon>
    <FontIcon className="material-icons" style={iconStyles} color={Colors.yellow500}>cloud_download</FontIcon>
    <FontIcon className="material-icons" style={iconStyles} color={Colors.blue500}>videogame_asset</FontIcon>
  </div>
);

export default FontIconExampleIcons;

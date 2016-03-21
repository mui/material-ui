import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 24,
};

const FontIconExampleIcons = () => (
  <div>
    <FontIcon className="material-icons" style={iconStyles}>home</FontIcon>
    <FontIcon className="material-icons" style={iconStyles} color={red500}>flight_takeoff</FontIcon>
    <FontIcon className="material-icons" style={iconStyles} color={yellow500}>cloud_download</FontIcon>
    <FontIcon className="material-icons" style={iconStyles} color={blue500}>videogame_asset</FontIcon>
  </div>
);

export default FontIconExampleIcons;

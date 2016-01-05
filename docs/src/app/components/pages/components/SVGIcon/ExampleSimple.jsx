import React from 'react';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import Colors from 'material-ui/lib/styles/colors';


const iconStyles = {
  marginRight: 24,
};

const SvgIconExampleSimple = () => (
  <div>
    <ActionHome style={iconStyles} />
    <ActionHome style={iconStyles} color={Colors.blue500} />
    <ActionHome style={iconStyles} color={Colors.red500} hoverColor={Colors.greenA200} />
  </div>
);

export default SvgIconExampleSimple;

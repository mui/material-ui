import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import SvgIcon from 'material-ui/lib/svg-icon';


const iconStyles = {
  marginRight: 24,
};

const HomeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

const SvgIconExampleSimple = () => (
  <div>
    <HomeIcon style={iconStyles} />
    <HomeIcon style={iconStyles} color={Colors.blue500} />
    <HomeIcon style={iconStyles} color={Colors.red500} hoverColor={Colors.greenA200} />
  </div>
);

export default SvgIconExampleSimple;
